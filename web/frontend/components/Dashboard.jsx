import React, { useState } from "react";
import { Spinners } from "./index";
import { useShopQuery } from "../hooks";
import { Banner } from "@shopify/polaris";
import Sidebar from "./Sidebar";
import Product from "./Product";
import HomeSeo from "./HomeSeo";

export function Dashboard() {
  // const { isLoading, isError } = useShopQuery({
  //   url: "/api/shop",
  // });

  const [selectedSidebar, setSelectedSidebar] = useState(2);

  return (
    <>
      {/* {isLoading && !isError ? (
        <Spinners />
      ) : ( */}
      {/* <>
        {isError ? (
          <Banner title="Error">
            <p>
              An error occurred while processing this Page. Please try again
              later.
            </p>
          </Banner>
        ) : ( */}
      <div className="app__container">
        <Sidebar
          selectedSidebar={selectedSidebar}
          setSelectedSidebar={setSelectedSidebar}
        />
        <div className="app__dashboard_container">
          {selectedSidebar === 1 && <HomeSeo />}
          {selectedSidebar === 2 && <Product />}
        </div>
      </div>
      {/* )}
      </> */}
      {/* )} */}
    </>
  );
}
