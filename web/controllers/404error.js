import shopify from "../shopify.js";

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
  //   const { referrer, shop, timestamp, url } = req.body;
  //   const accessToken = await getAccessTokenForShop(shopUrl);
  //   console.log("🚀 ~ updateErrorInsightsSeo ~ accessToken:", accessToken);
  //   // Create a new session using the shop and access token
  //   const session = new shopify.Session({
  //     shopUrl,
  //     accessToken,
  //     isOnline: false, // or true depending on your app's logic
  //   });

  try {
    // const metafield = new shopify.api.rest.Metafield({
    //   session: session,
    // });

    // metafield.namespace = "seo-app-bs23";
    // metafield.key = "seo-error-insights";
    // metafield.type = "json";
    // metafield.value = JSON.stringify(errorList);
    // await metafield.save({
    //   update: true,
    // });
    // return res.status(200).json(metafield);
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
