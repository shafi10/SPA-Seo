import { Tabs } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { ErrorList } from "./Errorlist";

export function ErrorInsights() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-Product-1",
      content: "Error insights",
      panelID: "all-error-content-1",
    },
    {
      id: "accepts-error-alt-1",
      content: "Auto Redirect",
      panelID: "accepts-Product-alt-content-1",
    },
  ];

  return (
    <div>
      <div className="seo_score_page_title_container">
        <div className="seo_score_page_title">404 Error</div>
      </div>
      <div>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          {selected === 0 && <ErrorList />}
        </Tabs>
      </div>
    </div>
  );
}
