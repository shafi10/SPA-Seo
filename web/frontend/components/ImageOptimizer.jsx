import React, { useState, useCallback } from "react";
import { Tabs } from "@shopify/polaris";
import { AltText } from "./AltText";

export function ImageOptimizer() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "seo-app-alt-text",
      content: "Alt text",
      accessibilityLabel: "Alt text",
      panelID: "seo-app-alt-text",
      component: <AltText />,
    },
    {
      id: "seo-app-image-compression",
      content: "Image compression",
      panelID: "seo-app-image-compression",
      component: <h1>kisu nai</h1>,
    },
    {
      id: "seo-app-imge-filename-optimization",
      content: "Filename optimization",
      panelID: "seo-app-imge-filename-optimization",
      component: <h1>kisu nai</h1>,
    },
  ];
  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      {tabs[selected].component}
    </Tabs>
  );
}
