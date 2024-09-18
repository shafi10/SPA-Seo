import React, { useState } from "react";
import { useShopQuery } from "../hooks";
import Sidebar from "./Sidebar";
import Product from "./Product";
import HomeSeo from "./HomeSeo";
import ProductBulkUpdate from "./ProductBulkUpdate";
import CollectionsPage from "./Collections";
import CollectionBulkUpdate from "./CollectionBulkUpdate";
import JsonLd from "./JsonLdPage";
import { useMetafieldsQuery } from "../hooks/useMetafieldQuery";

export function Dashboard() {
  useShopQuery({
    url: "/api/shop",
  });
  useMetafieldsQuery({ url: "/api/metafields" });

  const [selectedSidebar, setSelectedSidebar] = useState(2);

  return (
    <>
      <div className="app__container">
        <Sidebar
          selectedSidebar={selectedSidebar}
          setSelectedSidebar={setSelectedSidebar}
        />
        <div className="app__dashboard_container">
          {selectedSidebar === 1 && <HomeSeo />}
          {selectedSidebar === 2 && <Product />}
          {selectedSidebar === 3 && <ProductBulkUpdate />}
          {selectedSidebar === 4 && <CollectionsPage />}
          {selectedSidebar === 5 && <CollectionBulkUpdate />}
          {selectedSidebar === 6 && <JsonLd />}
        </div>
      </div>
    </>
  );
}
