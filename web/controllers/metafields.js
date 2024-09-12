import shopify from "../shopify.js";
import {
  CheckShopMetafieldDefinition,
  CreateShopMetafieldDefinition,
} from "../graphql/metafields.js";

export const MetafieldTest = async (req, res, next) => {
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const response = await client.query({
      data: {
        query: CheckShopMetafieldDefinition,
      },
    });

    if (response.body.data.metafieldDefinitions.edges.length == 0) {
      await client.query({
        data: { query: CreateShopMetafieldDefinition },
      });

      return res
        .status(200)
        .json({ message: "Created a new metafield definition" });
    }

    return res
      .status(200)
      .json({
        message: "Metafield definition already exists",
        data: response.body.data,
      });
  } catch (error) {
    console.error(
      "Failed to check shop metafield:",
      error.response?.errors || error.message
    );
  }
};
