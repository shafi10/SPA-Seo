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
  BusinessTypeInformation,
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
          subtitle={data?.domain}
          title={data?.name}
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
            <BusinessTypeInformation />
            <Divider />
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
            <Box paddingBlockStart={"5"}>
              <Layout>
                <Layout.Section oneThird>
                  <Box paddingBlockEnd={"4"}>
                    <Text variant="headingMd">Show snippet</Text>
                  </Box>
                  <Box>
                    <Text variant="bodyMd">
                      Inject your organization information for seach engines
                      like googles to crawl
                    </Text>
                  </Box>
                </Layout.Section>
                <Layout.Section oneHalf>
                  <Box>
                    <AlphaCard>
                      <VerticalStack gap={"6"}>
                        <Text variant="bodyMd">
                          Add organization snippet in storefront.
                        </Text>
                        <VerticalStack gap={"2"}>
                          <Text variant="headingSm">Status</Text>
                          <Switch
                            checked={organization?.status}
                            handleClick={handleCheckedChange}
                          />
                        </VerticalStack>
                      </VerticalStack>
                    </AlphaCard>
                  </Box>
                </Layout.Section>
              </Layout>
            </Box>
          </Box>
        </Page>
      ) : (
        <>Loading . . .</>
      )}
    </>
  );
}
