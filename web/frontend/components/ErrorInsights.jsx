import { Button, Tabs } from "@shopify/polaris";
import React from "react";

export function ErrorInsights() {
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
  ];

  return (
    <div>
      <div className="seo_score_page_title_container">
        <div className="seo_score_page_title">404 Error</div>
        <div className="">
          <Button primary submit>
            Submit
          </Button>
        </div>
      </div>
      <div>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          {selected === 0 && <></>}
        </Tabs>
      </div>
    </div>
  );
}
