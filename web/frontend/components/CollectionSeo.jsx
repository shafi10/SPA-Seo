import React from "react";
import { Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { CreateCollectionSeo } from "./CreateCollectionSeo";
import { CollectionAltTextImage } from "./CollectionAltText";
import { GenerateJsonld } from "./GenerateJsonld";

export default function CollectionSeo() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-Product-1",
      content: "Collection SEO",
      panelID: "all-Product-content-1",
    },
    {
      id: "accepts-Product-alt-1",
      content: "Collection Image alt",
      panelID: "accepts-Product-alt-content-1",
    },
    {
      id: "accepts-Jsonld-1",
      content: "SEO Markup Generator (JSON-LD)",
      panelID: "accepts-jsonld-1",
    },
  ];

  return (
    <div>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {selected === 0 && (
          <div className="app__product_seo_creation">
            <CreateCollectionSeo />
          </div>
        )}
        {selected === 1 && <CollectionAltTextImage />}
        {selected === 2 && <GenerateJsonld obj_type={"Collection"} />}
      </Tabs>
    </div>
  );
}
