import React, { useState } from "react";
import { useAuthenticatedFetch, useShopQuery } from "../hooks";
import {
  AlphaCard,
  Box,
  Card,
  Divider,
  HorizontalStack,
  Layout,
  Page,
  Select,
  Text,
  TextField,
  VerticalStack,
} from "@shopify/polaris";
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
  console.log(data);
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
