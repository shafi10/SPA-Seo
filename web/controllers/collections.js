import shopify from "../shopify.js";

const fetchAllCollections = async (session) => {
  let allCollections = [];
  let hasNextPage = true;
  let variables = {
    first: 200,
    after: null,
  };

  const query = `
    query ($first: Int!, $after: String) {
      collections(first: $first, after: $after, reverse: true) {
        edges {
          node {
            id
            title
            handle
            updatedAt
            sortOrder
            seo{
                        title
                        description
                      }
            image {
              id
              url
              altText
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

      const collections = response.body.data.collections.edges.map(
        (edge) => edge.node
      );
      const pageInfo = response.body.data.collections.pageInfo;
      const endCursor =
        response.body.data.collections.edges.length > 0
          ? response.body.data.collections.edges[
              response.body.data.collections.edges.length - 1
            ].cursor
          : null;
      allCollections = allCollections.concat(collections);

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

  return allCollections;
};

export const getCollectionsController = async (req, res, next) => {
  try {
    const products = await fetchAllCollections(res.locals.shopify.session);

    return res.status(200).json(products);
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};

export const updateCollectionSEO = async (req, res, next) => {
  try {
    const { id, seoTitle, seoDescription } = req.body;

    const mutation = `
    mutation updateCollection($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection {
          id
          title
          seo{
            description
            title
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

    const variables = {
      input: {
        id: id,
        seo: {
          description: seoDescription,
          title: seoTitle,
        },
      },
    };

    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const response = await client.query({
      data: {
        query: mutation,
        variables: variables,
      },
    });

    if (response.body.data.collectionUpdate.userErrors.length > 0) {
      console.error("Errors:", response.body.data.collectionUpdate.userErrors);
      return res
        .status(400)
        .json({ error: response.body.data.collectionUpdate.userErrors });
    } else {
      console.log(
        "Updated product SEO:",
        response.body.data.collectionUpdate.collection
      );
      return res
        .status(200)
        .json({ product: response.body.data.collectionUpdate.collection });
    }
  } catch (error) {
    console.error(
      "Failed to update product SEO:",
      error.response?.errors || error.message
    );
  }
};

export const updateProductBulkSeo = async (req, res) => {
  const { products } = req.body;

  let query = ``;
  for (let i = 0; i < products.length; i++) {
    query += `productUpdate_${i}: productUpdate(input: {
      id: "${products[i]?.id}",
      seo: {
        description: "${products[i]?.seo_description}",
        title: "${products[i]?.seo_title}",
      },
    }) {
      product {
        id
        title
        seo{
          description
          title
        }
      }
      userErrors {
        field
        message
      }
    }`;
  }

  const mutation = `mutation {
    ${query}
  }`;
  console.log("🚀 ~ updateProductBulkSeo ~ mutation:", mutation);

  const client = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  const response = await client.query({
    data: mutation,
  });

  console.log(
    "🚀 ~ updateProductBulkSeo ~ response:",
    response.body.data?.productUpdate_0?.userErrors
  );
  if (response.body?.data?.productUpdate_0?.userErrors?.length > 0) {
    return res.status(400).json({ error: response.body.data });
  } else {
    return res.status(200).json({ product: response.body.data });
  }
};

export const updateImageSeoAltController = async (req, res, next) => {
  try {
    const { id, imageId, altText } = req.body;

    const mutation = `mutation productImageUpdate($productId: ID!, $image: ImageInput!) {
      productImageUpdate(productId: $productId, image: $image) {
        image {
          id
          altText
        }
        userErrors {
          field
          message
        }
      }
    }`;

    const variables = {
      productId: id,
      image: {
        id: imageId,
        altText: altText,
      },
    };

    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const response = await client.query({
      data: {
        query: mutation,
        variables: variables,
      },
    });

    if (response.body.data?.productImageUpdate?.userErrors?.length > 0) {
      console.error(
        "Errors:",
        response.body.data.productImageUpdate.userErrors
      );
      return res
        .status(400)
        .json({ error: response.body.data?.productImageUpdate?.userErrors });
    } else {
      return res
        .status(200)
        .json({ product: response.body.data.productImageUpdate.image });
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};

export const showOrHideProductHighlightController = async (req, res, next) => {
  try {
    const { id, checked } = req.body;

    const metafield = new shopify.api.rest.Metafield({
      session: res.locals.shopify.session,
    });
    metafield.product_id = id;
    metafield.namespace = "check_highlight";
    metafield.key = "check_product_highlight";
    metafield.value = checked ? "yes" : "no";
    metafield.type = "single_line_text_field";
    await metafield.save({
      update: true,
    });

    return res.status(200).json(metafield?.value);
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};
