import React from "react";
import { useAuthenticatedFetch, useShopQuery } from "../hooks";
import { Box, Divider, Page, Text } from "@shopify/polaris";
import {
  IndustryInformation,
  BrandInformation,
  CompanyLogoInformation,
  ContactInformation,
  PriceRangeInformation,
  ProductReviewInformation,
  SocialMediaInformation,
} from "./HomepageSeoComponents";
import { useHomeSeo } from "../contexts/home.context";

export default function HomeSeo() {
  const { data, error, status, isError, isLoading } = useShopQuery({
    url: "/api/shop",
  });
  const fetcher = useAuthenticatedFetch();
  const { organization } = useHomeSeo();

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
              onAction: () =>
                fetcher("/api/metafields/create", {
                  method: "POST",
                  body: JSON.stringify({
                    page: "/product",
                    data: { p: 200, gg: "gg" },
                  }),
                  headers: { "Content-Type": "application/json" },
                }),
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
