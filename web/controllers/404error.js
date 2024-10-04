import shopify from "../shopify.js";
import { getAccessTokenForShop } from "../utils/getShopAccessToken.js";

export const getErrorInsightsContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await shopify.api.rest.Metafield.all({
      session: res.locals.shopify.session,
      namespace: "seo-app-bs23",
    });

    const highlight = response?.data?.find(
      (data) => data?.key === "seo-blog-article"
    );
    const highlightList = highlight?.value ? JSON.parse(highlight?.value) : "";

    return res.status(200).json(highlightList);
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};

export const updateErrorInsightsSeo = async (req, res) => {
  console.log("highlight", req.body);
  const { referrer, shop, timestamp, url } = req.body;
  const shopURL = shop.split("://")[1];
  const accessToken = await getAccessTokenForShop(shopURL);
  const insights = [req.body];
  try {
    await fetch(`${shop}/admin/api/2024-07/metafields.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": accessToken?.[0]?.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metafield: {
          namespace: "seo-app-bs23",
          key: "seo-404error-insights",
          type: "json",
          value: JSON.stringify(insights),
        },
      }),
    });
    return res.status(200).json("");
  } catch (error) {
    console.log(error);
  }
};

export const updateImageSeoAltController = async (req, res, next) => {
  try {
    const { id, blogId, image } = req.body;

    const article = new shopify.api.rest.Article({
      session: res.locals.shopify.session,
    });
    article.blog_id = blogId;
    article.id = id;
    article.image = image;

    await article.save({
      update: true,
    });

    return res
      .status(200)
      .json({ status: "Success", message: "Successfully updated" });
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};
