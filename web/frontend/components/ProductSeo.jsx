import React from "react";
import { Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { CreateProductSeo } from "./CreateProductSeo";
import { AltimageCreate } from "./AltimageCreate";
import { SeoScore } from "./SeoScore";

export default function ProductSeo() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-Score-1",
      content: "SEO Score",
      panelID: "all-Product-score-content-1",
    },
    {
      id: "all-Product-1",
      content: "Product SEO",
      panelID: "all-Product-content-1",
    },
    {
      id: "accepts-Product-alt-1",
      content: "Product Image alt",
      panelID: "accepts-Product-alt-content-1",
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {selected === 0 && <SeoScore />}
        {selected === 1 && (
          <div className="app__product_seo_creation">
            <CreateProductSeo />
          </div>
        )}
        {selected === 2 && <AltimageCreate />}
      </Tabs>
    </div>
  );
}
