import React from "react";
import { Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { CreateArticleSeo } from "./CreateArticleSeo";
import { ArticleAltTextImage } from "./BlogAltCreate";

export default function ArticleSeo() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-blog-1",
      content: "Article SEO",
      panelID: "all-Product-content-1",
    },
    {
      id: "accepts-blog-alt-1",
      content: "Article Image alt",
      panelID: "accepts-Product-alt-content-1",
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {selected === 0 && (
          <div className="app__product_seo_creation">
            <CreateArticleSeo />
          </div>
        )}
        {selected === 1 && <ArticleAltTextImage />}
      </Tabs>
    </div>
  );
}
