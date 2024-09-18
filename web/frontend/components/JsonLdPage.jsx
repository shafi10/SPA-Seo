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

export default function JsonLd() {
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
            onAction: () => console.log("Save"),
          }}
          secondaryActions={[
            {
              content: "Test hit",
              onAction: () =>
                createMetafield({
                  type: "Organization",
                  data: organization,
                }),
            },
          ]}
        >
          <Box paddingInlineStart={"32"} paddingInlineEnd={"32"}>
            <Text>{JSON.stringify(organization)}</Text>
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
