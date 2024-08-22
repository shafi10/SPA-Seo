import React from "react";
import { LegacyCard, Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { CreateProductSeo } from "./CreateProductSeo";

export default function ProductSeo() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
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
        {selected === 0 && (
          <div className="app__product_seo_creation">
            <div>
              <CreateProductSeo />
            </div>
          </div>
        )}
      </Tabs>
    </div>
  );
}
