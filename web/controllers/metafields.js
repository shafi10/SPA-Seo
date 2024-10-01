import shopify from "../shopify.js";
import {
  CheckShopMetafieldDefinition,
  CreateShopMetafieldDefinition,
  GetShopId,
  GetShopMetafield,
  GetProductMetafield,
  GetCollectionMetafield,
  SetShopMetafield,
} from "../graphql/metafields.js";

async function initializeMetafield(client, type) {
  try {
    console.log("initializing metafield", type);
    const response = await client.query({
      data: {
        query: CheckShopMetafieldDefinition(type),
      },
    });

    if (response.body.data.metafieldDefinitions.edges.length == 0) {
      const metafieldCreationResponse = await client.query({
        data: { query: CreateShopMetafieldDefinition(type) },
      });

      if (
        metafieldCreationResponse.body.data.metafieldDefinitionCreate.userErrors
          .length > 0
      ) {
        return {
          status: 400,
          error:
            metafieldCreationResponse.body.data.metafieldDefinitionCreate
              .userErrors,
        };
      }

      return {
        status: 200,
        message: "Created a new metafield definition",
        data: metafieldCreationResponse.body.data.metafieldDefinitionCreate,
      };
    }

    return {
      status: 200,
      message: "Metafield definition already exists",
      data: response.body.data,
    };
  } catch (error) {
    throw error;
  }
}

function generateJsonldFromPayload(payload) {
  const socialMedia = Object.entries(payload.socialMedia)
    .map(([key, val]) => `"${val}"`)
    .join(",\n");
  const jsonld = {
    "@context": "http://schema.org/",
    "@type": "Organization",
    ...payload,
    socialMedia,
  };
  return jsonld;
}

export const MetafieldCreate = async (req, res, next) => {
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });
    let { type, data, owner, ownerId } = req.body;

    await initializeMetafield(client, owner);
    let prevData = {};

    if (owner == "SHOP") {
      prevData = await client.query({
        data: {
          query: GetShopMetafield,
        },
      });
    } else if (owner == "PRODUCT") {
      prevData = await client.query({
        data: {
          query: GetProductMetafield(ownerId),
        },
      });
    } else if (owner == "COLLECTION") {
      prevData = await client.query({
        data: {
          query: GetCollectionMetafield(ownerId),
        },
      });
    }

    if (prevData.body.data[`${owner.toLowerCase()}`].metafield) {
      prevData = JSON.parse(
        prevData.body.data[`${owner.toLowerCase()}`].metafield.value
      );
    } else {
      prevData = {};
    }

    let shopId = await client.query({
      data: {
        query: GetShopId,
      },
    });
    shopId = shopId.body.data.shop.id;
    if (ownerId == null) ownerId = shopId;
    const setMetafieldResponse = await client.query({
      data: {
        query: SetShopMetafield,
        variables: {
          metafields: [
            {
              key: "json-ld",
              namespace: "bs-23-seo-app",
              ownerId,
              value: JSON.stringify({
                ...prevData,
                [type]: data,
                active: req.body.active,
              }),
            },
          ],
        },
      },
    });

    if (setMetafieldResponse.body.data.metafieldsSet.userErrors.length > 0) {
      return res.status(400).json({
        error: setMetafieldResponse.body.data.metafieldsSet.userErrors,
      });
    }

    return res.status(200).json({
      message: "saved metafield successfully",
    });
  } catch (error) {
    console.error(
      "Failed to create shop metafield:",
      error.response?.errors || error.message
    );
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const GetMetafields = async (req, res, next) => {
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    let metafieldData = await client.query({
      data: {
        query: GetShopMetafield,
      },
    });

    if (metafieldData.body.data.shop.metafield) {
      metafieldData = JSON.parse(metafieldData.body.data.shop.metafield.value);
    } else {
      metafieldData = null;
    }

    return res.status(200).json({
      message: "Retrived metafield successfully",
      data: metafieldData,
    });
  } catch (error) {
    console.error(
      "Failed to get shop metafield:",
      error.response?.errors || error.message
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
