import shopify from "../shopify.js";

export const createHomeSEOController = async (req, res, next) => {
  try {
    const { homeSeo } = req.body;

    // Update seo content to metafield
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

export const createSEOSnippetController = async (req, res, next) => {
  try {
    const updatedTitleMeta = `
    {% if request.page_type == 'index' %}
  {% if shop.metafields['seo-app-bs23']['home-seo-value'] %}
    <title>{{ shop.metafields['seo-app-bs23']['home-seo-value'].value.seo_title | escape }}</title>
    <meta name="description" content="{{ shop.metafields['seo-app-bs23']['home-seo-value'].value.seo_description | escape }}">
  {% else %}
    <title>{{ shop.name | escape }}</title>
    <meta name="description" content="{{ shop.description | escape }}">
  {% endif %}
{% elsif request.page_type == 'article' %}
  {% if article.metafields['seo-app-bs23']['seo-blog-article'] %}
    <title>{{ article.metafields['seo-app-bs23']['seo-blog-article'].value.seoTitle | escape }}</title>
    <meta name="description" content="{{ article.metafields['seo-app-bs23']['seo-blog-article'].value.seoDescription | escape }}">
  {% else %}
    <title>{{ article.title | escape }}</title>
    <meta name="description" content="{{ article.excerpt | escape }}">
  {% endif %}
{% else %}
   <title>
  {{ page_title }}
  {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
  {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
  {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
   </title>
   {% if page_description %}
     <meta name="description" content="{{ page_description | escape }}">
  {% endif %}
{% endif %}

{% if request.page_type == 'index' %}
  {%- assign og_title = shop.metafields['seo-app-bs23']['home-seo-value'].value.seo_title | default: shop.name -%}
  {%- assign og_description = shop.metafields['seo-app-bs23']['home-seo-value']?.value?.seo_description | default: shop.description | default: shop.name -%}
{%- elsif request.page_type == 'article' -%}
  {%- assign og_title = article.metafields['seo-app-bs23']['seo-blog-article'].value.seoTitle | default: article.title -%}
  {%- assign og_description = article.metafields['seo-app-bs23']['seo-blog-article'].value.seoDescription | default: article.excerpt | default: shop.description -%}
{%- else -%}
  {%- assign og_title = page_title | default: shop.name -%}
  {%- assign og_description = page_description | default: shop.description | default: shop.name -%}
{%- endif -%}

{%- liquid
  assign og_url = canonical_url | default: request.origin
  assign og_type = 'website'

  if request.page_type == 'product'
    assign og_type = 'product'
  elsif request.page_type == 'article'
    assign og_type = 'article'
  elsif request.page_type == 'password'
    assign og_url = request.origin
  endif
%}

<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:url" content="{{ og_url }}">
<meta property="og:title" content="{{ og_title | escape }}">
<meta property="og:type" content="{{ og_type }}">
<meta property="og:description" content="{{ og_description | escape }}">

{%- if page_image -%}
  <meta property="og:image" content="http:{{ page_image | image_url }}">
  <meta property="og:image:secure_url" content="https:{{ page_image | image_url }}">
  <meta property="og:image:width" content="{{ page_image.width }}">
  <meta property="og:image:height" content="{{ page_image.height }}">
{%- endif -%}

{%- if request.page_type == 'product' -%}
  <meta property="og:price:amount" content="{{ product.price | money_without_currency | strip_html }}">
  <meta property="og:price:currency" content="{{ cart.currency.iso_code }}">
{%- endif -%}

{%- if settings.social_twitter_link != blank -%}
  <meta name="twitter:site" content="{{ settings.social_twitter_link | split: 'twitter.com/' | last | prepend: '@' }}">
{%- endif -%}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ og_title | escape }}">
<meta name="twitter:description" content="{{ og_description | escape }}">
    `;

    const themeList = await shopify.api.rest.Theme.all({
      session: res.locals.shopify.session,
      fields: "id,name,role",
    });

    const mainTheme = themeList?.data?.find(
      (theme) => theme?.role === "development"
    );

    const isPresent = await isSeoSnippetsAvailable(
      res.locals.shopify.session,
      mainTheme?.id
    );

    //Create snippets if not found
    if (!isPresent) {
      const asset = new shopify.api.rest.Asset({
        session: res.locals.shopify.session,
      });
      asset.theme_id = mainTheme?.id;
      asset.key = "snippets/seofy-complete-seo-expert.liquid";
      asset.value = updatedTitleMeta;
      await asset.save({
        update: true,
      });
    }

    const assetFile = await shopify.api.rest.Asset.all({
      session: res.locals.shopify.session,
      theme_id: mainTheme?.id,
      asset: { key: "layout/theme.liquid" },
    });

    const assetFileContent = assetFile?.data?.[0]?.value;

    if (
      !assetFileContent.includes("{% render 'seofy-complete-seo-expert' %}")
    ) {
      const updatedContent = assetFileContent.replace(
        "<head>",
        `<head>
        {% render 'seofy-complete-seo-expert' %}
        `
      );

      const layout = new shopify.api.rest.Asset({
        session: res.locals.shopify.session,
      });
      layout.theme_id = mainTheme?.id;
      layout.key = "layout/theme.liquid";
      layout.value = updatedContent;
      await layout.save({
        update: true,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "successfully updated",
    });
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};

async function isSeoSnippetsAvailable(session, id) {
  try {
    await shopify.api.rest.Asset.all({
      session: session,
      theme_id: id,
      asset: { key: "snippets/seofy-complete-seo-expert.liquid" },
    });
    return true;
  } catch (error) {
    return false;
  }
}
