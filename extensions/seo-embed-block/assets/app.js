document.addEventListener("DOMContentLoaded", function () {
  let page = "{{ request.page_type }}";
  console.log("🚀 ~ document.addEventListener ~ page:", page);
  var seoTitle =
    "{{ article.metafields['seo-app-bs23']['article-seo-value'].value.seoTitle }}";
  console.log("🚀 ~ seoTitle:", seoTitle);
  // var seoDescription = "{{ shop.metafields['seo-app-bs23']['article-seo-value'].value.seo_description }}";

  // if (seoTitle) {
  //   document.title = seoTitle;
  // }

  // if (seoDescription) {
  //   var metaDescription = document.querySelector('meta[name="description"]');
  //   if (metaDescription) {
  //     metaDescription.setAttribute('content', seoDescription);
  //   } else {
  //     var newMetaDescription = document.createElement('meta');
  //     newMetaDescription.name = 'description';
  //     newMetaDescription.content = seoDescription;
  //     document.head.appendChild(newMetaDescription);
  //   }
  // }
});
