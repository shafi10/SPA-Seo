import React, { useState } from "react";
import { useShopQuery } from "../hooks";
import {
  Box,
  Divider,
  Page,
  Layout,
  AlphaCard,
  Text,
  HorizontalStack,
  VerticalStack,
} from "@shopify/polaris";
import {
  IndustryInformation,
  BrandInformation,
  CompanyLogoInformation,
  ContactInformation,
  PriceRangeInformation,
  ProductReviewInformation,
  SocialMediaInformation,
} from "./CompanyProfileUiComponents";
import { useHomeSeo } from "../contexts/home.context";
import { useCreateMetafield } from "../hooks/useMetafieldQuery";
import Switch from "./commonUI/Switch/Switch";

export default function CompanyProfile() {
  const { data, error, status, isError, isLoading } = useShopQuery({
    url: "/api/shop",
  });
  const { organization, setOrganization } = useHomeSeo();
  const { mutate: createMetafield, isError: isErrorOnCreatingMetafield } =
    useCreateMetafield("metafieldList");
  const handleCheckedChange = () => {
    setOrganization({
      ...organization,
      status: !organization.status,
    });
  };

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
          <Layout>
            <Layout.Section>
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
            </Layout.Section>
            <Layout.Section secondary>
              <Box paddingInlineStart={"20"}>
                <HorizontalStack align="space-between" blockAlign="center">
                  <div style={{ width: "70%" }}>
                    <VerticalStack gap={"2"}>
                      <Text variant="headingMd">Json-LD snippet</Text>
                      <Text variant="bodyMd">
                        Inject your organization information for seach engines
                        like googles to crawl
                      </Text>
                    </VerticalStack>
                  </div>
                  <Switch
                    checked={organization?.status}
                    handleClick={handleCheckedChange}
                  />
                </HorizontalStack>
              </Box>
            </Layout.Section>
          </Layout>
        </Page>
      ) : (
        <>Loading . . .</>
      )}
    </>
  );
}
