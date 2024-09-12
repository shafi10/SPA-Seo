import React from "react";
import { useAuthenticatedFetch, useShopQuery } from "../hooks";
import { Box, Divider, Page } from "@shopify/polaris";
import IndustryInformation from "./HomepageSeoComponents/IndustryInformation";
import BrandInformation from "./HomepageSeoComponents/BrandInformation";
import ContactInformation from "./HomepageSeoComponents/ContactInformation";
import PriceRangeInformation from "./HomepageSeoComponents/PriceRangeInformation";
import SocialMediaInformation from "./HomepageSeoComponents/SocialMediaInformation";
import CompanyLogoInformation from "./HomepageSeoComponents/CompanyLogoInformation";
import ProductReviewInformation from "./HomepageSeoComponents/ProductReviewAppInformation";

export default function HomeSeo() {
  const { data, error, status, isError, isLoading } = useShopQuery({
    url: "/api/shop",
  });
  const fetcher = useAuthenticatedFetch();

  return (
    <>
      {!isLoading ? (
        <Page
          fullWidth
          compactTitle
          divider
          subtitle={data.domain}
          title={data.name}
          primaryAction={{
            content: "Save",
            onAction: () => console.log("Save"),
          }}
          secondaryActions={[
            {
              content: "Test hit",
              onAction: () => fetcher("/api/metafields/test"),
            },
          ]}
        >
          <Box paddingInlineStart={"32"} paddingInlineEnd={"32"}>
            <IndustryInformation />
            <Divider />
            <BrandInformation />
            <Divider />
            <CompanyLogoInformation />
            <Divider />
            <ContactInformation />
            <Divider />
            <PriceRangeInformation />
            <Divider />
            <SocialMediaInformation />
            <Divider />
            <ProductReviewInformation />
            <Divider />
          </Box>
        </Page>
      ) : (
        <>Loading . . .</>
      )}
    </>
  );
}
