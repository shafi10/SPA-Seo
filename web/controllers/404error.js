import shopify from "../shopify.js";
import { getAccessTokenForShop } from "../utils/getShopAccessToken.js";

export const getErrorInsightsContent = async (req, res, next) => {
  try {
    const response = await shopify.api.rest.Metafield.all({
      session: res.locals.shopify.session,
      namespace: "seo-app-bs23",
    });

    const highlight = response?.data?.find(
      (data) => data?.key === "seo-404error-insights"
    );
    const errorList = highlight?.value ? JSON.parse(highlight?.value) : [];

    // Step 1: Total Visits
    const totalVisits = errorList.length;

    // Step 2: Unique URLs Visited
    const uniqueUrls = [...new Set(errorList.map((visit) => visit.url))];
    const uniqueUrlsCount = uniqueUrls.length;

    // Step 3: Most Frequent URL
    const urlFrequency = errorList.reduce((acc, visit) => {
      acc[visit.url] = (acc[visit.url] || 0) + 1;
      return acc;
    }, {});

    const mostFrequentUrl = Object.keys(urlFrequency).reduce((a, b) =>
      urlFrequency[a] > urlFrequency[b] ? a : b
    );

    let mostFrequentOne = {
      url: mostFrequentUrl,
      count: urlFrequency[mostFrequentUrl],
    };

    //last visited
    const lastVisitTime = errorList[errorList?.length - 1];

    return res.status(200).json({
      totalVisits: totalVisits,
      uniqueUrlsCount: uniqueUrlsCount,
      mostFrequentOne: mostFrequentOne,
      lastVisit: lastVisitTime,
      errorList: errorList,
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};

export const updateErrorInsightsSeo = async (req, res) => {
  const { shop } = req.body;
  const shopURL = shop.split("://")[1];
  const accessToken = await getAccessTokenForShop(shopURL);

  try {
    const errorList = await fetch(
      `${shop}/admin/api/2024-07/metafields.json?namespace=seo-app-bs23`,
      {
        method: "GET",
        headers: {
          "X-Shopify-Access-Token": accessToken?.[0]?.accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    const response = await errorList.json();
    const responseList = response?.metafields?.find(
      (metafield) => metafield.key === "seo-404error-insights"
    );
    const list = responseList?.value ? JSON.parse(responseList?.value) : [];
    const newList = [...list, req.body];
    console.log("🚀 ~ updateErrorInsightsSeo ~ newList:", newList);

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
          value: JSON.stringify(newList),
        },
      }),
    });

    return res.status(200).json({
      status: "success",
      message: "Created successfully",
    });
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
