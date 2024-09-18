import shopify from "../shopify.js";
import {
  CheckShopMetafieldDefinition,
  CreateShopMetafieldDefinition,
  GetShopId,
  GetShopMetafield,
  SetShopMetafield,
} from "../graphql/metafields.js";

async function initializeMetafield(client) {
  try {
    const response = await client.query({
      data: {
        query: CheckShopMetafieldDefinition,
      },
    });

    if (response.body.data.metafieldDefinitions.edges.length == 0) {
      const metafieldCreationResponse = await client.query({
        data: { query: CreateShopMetafieldDefinition },
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
    await initializeMetafield(client);

    const { page, data } = req.body;
    let prevData = await client.query({
      data: {
        query: GetShopMetafield,
      },
    });

    if (prevData.body.data.shop.metafield) {
      prevData = JSON.parse(prevData.body.data.shop.metafield.value);
    } else {
      prevData = {};
    }

    let shopId = await client.query({
      data: {
        query: GetShopId,
      },
    });
    shopId = shopId.body.data.shop.id;
    const setMetafieldResponse = await client.query({
      data: {
        query: SetShopMetafield,
        variables: {
          metafields: [
            {
              key: "json-ld",
              namespace: "bs-23-seo-app",
              ownerId: shopId,
              value: JSON.stringify({
                ...prevData,
                [page]: generateJsonldFromPayload(data),
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
      "Failed to check shop metafield:",
      error.response?.errors || error.message
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};
