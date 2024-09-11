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
          title={<Text variant="headingLg">{data.name}</Text>}
          primaryAction={{
            content: "Save",
            onAction: () => console.log("Save"),
          }}
        >
          <Box paddingInlineStart={"32"} paddingInlineEnd={"32"}>
            <IndustryInformation />
            <Divider />
          </Box>
        </Page>
      ) : (
        <>Loading . . .</>
      )}
    </>
  );
}
