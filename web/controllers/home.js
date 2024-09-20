import shopify from "../shopify.js";

export const createHomeSEOController = async (req, res, next) => {
  try {
    const { homeSeo } = req.body;

    const metafield = new shopify.api.rest.Metafield({
      session: res.locals.shopify.session,
    });

    metafield.namespace = "seo-app-bs23";
    metafield.key = "home-seo-value";
    metafield.value = JSON.stringify(homeSeo);
    metafield.type = "json";
    await metafield.save({
      update: true,
    });

    return res.status(200).json(metafield);
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};

export const getHomeSEOController = async (req, res, next) => {
  try {
    const response = await shopify.api.rest.Metafield.all({
      session: res.locals.shopify.session,
      namespace: "seo-app-bs23",
    });

    const highlight = response?.data?.find(
      (data) =>
        data?.namespace === "seo-app-bs23" && data?.key === "home-seo-value"
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
