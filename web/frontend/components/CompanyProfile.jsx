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
import { useCreateMetafield } from "../hooks/useMetafieldQuery";

export default function CompanyProfile() {
  const { data, error, status, isError, isLoading } = useShopQuery({
    url: "/api/shop",
  });
  const { organization } = useHomeSeo();
  const { mutate: createMetafield, isError: isErrorOnCreatingMetafield } =
    useCreateMetafield();

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
            onAction: () =>
              createMetafield({
                type: "organization",
                data: organization,
                owner: "SHOP",
              }),
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
          </Box>
        </Page>
      ) : (
        <>Loading . . .</>
      )}
    </>
  );
}
