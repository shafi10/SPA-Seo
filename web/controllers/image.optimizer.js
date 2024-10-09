import fs from "fs";
import shopify from "../shopify.js";

import {
  bulkOperationMutaion,
  createStagedUploadMutation,
} from "../graphql/bulk_operation.js";
import { error } from "console";

const fetchAllProducts = async (session) => {
  let allProducts = [];
  let hasNextPage = true;
  let variables = {
    first: 200,
    after: null,
  };

  const query = `
      query ($first: Int!, $after: String) {
        products(first: $first, after: $after, reverse: true) {
          edges {
            node {
              id
              title
              productType
              vendor
              tags
              media(first: 250) {
                edges {
                  node {
                    id
                    alt
                    mediaContentType
                  }
                }
              }
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    `;
  const client = new shopify.api.clients.Graphql({
    session: session,
  });

  while (hasNextPage) {
    try {
      const response = await client.query({
        data: {
          query: query,
          variables: variables,
        },
      });

      const products = response.body.data.products.edges.map(
        (edge) => edge.node
      );
      const pageInfo = response.body.data.products.pageInfo;
      const endCursor =
        response.body.data.products.edges.length > 0
          ? response.body.data.products.edges[
              response.body.data.products.edges.length - 1
            ].cursor
          : null;
      allProducts = allProducts.concat(products);

      // Check if there is a next page
      const hasNext = pageInfo.hasNextPage;
      if (hasNext) {
        variables = { ...variables, after: endCursor };
      } else {
        hasNextPage = false;
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      hasNextPage = false;
    }
  }

  return allProducts;
};

const fetchAllCollections = async (session) => {};

const translateAltText = (altTextSettings, owner, shop) => {
  const keywords = [
    "product.title",
    "product.vendor",
    "product.type",
    "product.vendor",
    "collection.title",
    "article.title",
    "article.author",
    "article.tags",
    "shop.name",
    "shop.domain",
  ];
  let altText = altTextSettings;

  keywords.forEach((keyword) => {
    const pattern = new RegExp(`\\{\\{\\s*${keyword}\\s*\\}\\}`, "g");
    const [ownerType, property] = keyword.split(".");
    let ownerData = null;

    if (ownerType.toLocaleLowerCase() == "shop") {
      switch (property.toLocaleLowerCase()) {
        case "name":
          ownerData = shop.name;
          break;
        case "domain":
          ownerData = shop.primaryDomain.host;
          break;
        default:
          ownerData = "";
          break;
      }
    } else if (ownerType.toLocaleLowerCase() == "product") {
      switch (property.toLocaleLowerCase()) {
        case "title":
          ownerData = owner.title;
          break;
        case "vendor":
          ownerData = owner.vendor;
          break;
        case "type":
          ownerData = owner.productType;
          break;
        case "tags":
          ownerData = owner.tags.join(", ");
          break;
        default:
          ownerData = "";
          break;
      }
    } else if (ownerType.toLocaleLowerCase() == "collection") {
      if (property.toLocaleLowerCase() == "title") {
        ownerData = owner.title;
      }
    } else if (ownerType.toLocaleLowerCase() == "article") {
      switch (property.toLocaleLowerCase()) {
        case "title":
          ownerData = owner.title;
          break;
        case "author":
          ownerData = owner.author;
          break;
        case "tags":
          ownerData = owner.tags.join(", ");
          break;
        default:
          ownerData = "";
          break;
      }
    }

    altText = altText.replace(pattern, ownerData);
  });

  return altText;
};

const wirteMutationVariablesToJsonlFile = (data) => {
  const jsonData = data
    .map((item) => {
      const ret = JSON.stringify(item).replace(/[\r\n]+/gm, "");
      return ret;
    })
    .join("\n");

  fs.truncateSync("./uploads/mutation_variables.jsonl", 0);
  fs.writeFileSync("./uploads/mutation_variables.jsonl", jsonData);
};

const uploadMutationVariablesFile = async (session, imagesToUpdate) => {
  const client = new shopify.api.clients.Graphql({
    session: session,
  });

  const stagedUploadResponse = await client.query({
    data: {
      query: createStagedUploadMutation,
    },
  });

  if (
    stagedUploadResponse.body.data.stagedUploadsCreate.userErrors.length > 0
  ) {
    throw new Error({
      message: "Error creating staged upload",
      errors: stagedUploadResponse.body.data.stagedUploadsCreate.userErrors,
    });
  }

  const { url, parameters } =
    stagedUploadResponse.body.data.stagedUploadsCreate.stagedTargets[0];

  const formData = new FormData();
  parameters.forEach(({ name, value }) => {
    formData.append(name, value);
  });

  const jsonData = imagesToUpdate
    .map((item) => {
      const ret = JSON.stringify(item).replace(/[\r\n]+/gm, "");
      return ret;
    })
    .join("\n");

  const file = new File([jsonData], "mutation_variables.jsonl", {
    type: "text/jsonl",
  });

  formData.append("file", file);

  // Send the fetch request
  const fetchResponse = await fetch(url, {
    method: "POST",
    body: formData,
    redirect: "follow",
  });

  const xmlRes = await fetchResponse.text();
  const locationRegex = /<Location>(.*?)<\/Location>/;
  const match = xmlRes.match(locationRegex);
  console.log(match);

  if (match && match[1]) {
    const location = match[1];
    console.log("Location:", location);
  } else {
    console.error("Location not found in the XML response.");
  }
};

export const BulkUpdateAltText = async (req, res, next) => {
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    let metafieldData = null,
      shopData = await client.query({
        data: {
          query: `
          query GetShopMetafield {
            shop {
                name
                primaryDomain {
                    id
                    host
                    url
                }
                metafield(key: "image-optimizer", namespace: "bs-23-seo-app") {
                    id
                    namespace
                    key
                    value
                }      
            }
          }`,
        },
      });

    if (shopData.body.data.shop.metafield) {
      metafieldData = JSON.parse(shopData.body.data.shop.metafield.value);
    }

    if (!metafieldData) {
      return res
        .status(400)
        .json({ message: "No optimization settings was specified" });
    }

    console.log("got metafield data", metafieldData);

    const imagesToUpdate = [];
    const allProducts = await fetchAllProducts(res.locals.shopify.session);

    console.log("got all products");

    allProducts.forEach((productData) => {
      const productAltText = translateAltText(
        metafieldData.altText.product,
        productData,
        shopData.body.data.shop
      );

      productData.media.edges.forEach(({ node }) => {
        if (productAltText !== node.alt) {
          // add this id and new alt text to an array
          imagesToUpdate.push({
            input: {
              id: node.id,
              alt: productAltText,
            },
          });
        }
      });
    });

    console.log("got images To Update");
    wirteMutationVariablesToJsonlFile(imagesToUpdate);
    console.log("wrote to file");

    await uploadMutationVariablesFile(
      res.locals.shopify.session,
      imagesToUpdate
    );

    return res.status(200).json({ message: "Bulk update alt text" });
  } catch (error) {
    console.error(error);
  }
};

export const BulkUpdateFileName = async (req, res, next) => {
  try {
    return res.status(200).json({ message: "Bulk update file name" });
  } catch (error) {
    console.error(error);
  }
};
