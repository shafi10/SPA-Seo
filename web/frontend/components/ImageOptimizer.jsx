import React, { useState, useCallback } from "react";
import {
  Page,
  Layout,
  AlphaCard,
  Box,
  Text,
  Divider,
  List,
  HorizontalStack,
} from "@shopify/polaris";
import Switch from "./commonUI/Switch/Switch";

export function ImageOptimizer() {
  const [productImageAlt, setProductImageAlt] = useState(null);
  const [collectionImgeAlt, setCollectionImageAlt] = useState(null);
  const [articleImageAlt, setArticleImageAlt] = useState(null);
  const [shopImageAltStatus, setShopImageAltStatus] = useState(false);

  const handleShopImageAltStatusChange = () =>
    setShopImageAltStatus((prev) => !prev);

  const handleSubmit = useCallback(() => {
    // console.log("submitting", showVarinats);
    // createMetafield({
    //   type: obj_type.toLowerCase(),
    //   owner: obj_type.toUpperCase(),
    //   ownerId: owner?.id,
    //   active: pushJson,
    //   data: {
    //     showTags,
    //     showVarinats: showVarinats,
    //     rating: rating,
    //     reviewCount: reviewCount,
    //     keywords: keywords.join(","),
    //   },
    // });
  }, []);

  return (
    <Page fullWidth title="Settings">
      <Layout>
        <Layout.Section>
          <AlphaCard>
            <Box paddingBlockEnd={"2"}>
              <HorizontalStack align="space-between">
                <Text variant="headingLg">Image Alt Optimization</Text>
                <Switch
                  checked={shopImageAltStatus}
                  handleClick={handleShopImageAltStatusChange}
                />
              </HorizontalStack>
            </Box>
            <Box paddingBlockEnd={"1"}>
              <Text variant="bodyMd">
                Alt tags helps you improve accessibility, relevance between
                images and content, and increase the ability to rank high in
                Google Images.
              </Text>
            </Box>
          </AlphaCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <AlphaCard padding={"0"}>
            <Box padding={"5"}>
              <Text variant="headingLg">Variables</Text>
            </Box>
            <Divider borderWidth="2" />
            <Box padding={"5"}>
              <Box paddingBlockEnd={"1"}>
                <Text variant="headingSm">PRODUCT</Text>
              </Box>
              <List type="bullet">
                <List.Item>
                  <Text variant="headingSm">{`{{ product.title }}`}</Text>
                </List.Item>
                <List.Item>
                  <Text variant="headingSm">{`{{ product.product_type }}`}</Text>
                </List.Item>
                <List.Item>
                  <Text variant="headingSm">{`{{ product.vendor }}`}</Text>
                </List.Item>
                <List.Item>
                  <Text variant="headingSm">{`{{ product.tags }}`}</Text>
                </List.Item>
              </List>
            </Box>
            <Divider borderWidth="2" />
            <Box padding={"5"}>
              <Box paddingBlockEnd={"1"}>
                <Text variant="headingSm">COLLECTION</Text>
              </Box>
              <List type="bullet">
                <List.Item>
                  <Text variant="headingSm">{`{{ collection.title }}`}</Text>
                </List.Item>
              </List>
            </Box>
            <Divider borderWidth="2" />
            <Box padding={"5"}>
              <Box paddingBlockEnd={"1"}>
                <Text variant="headingSm">BLOG POST</Text>
              </Box>
              <List type="bullet">
                <List.Item>
                  <Text variant="headingSm">{`{{ article.title }}`}</Text>
                </List.Item>
                <List.Item>
                  <Text variant="headingSm">{`{{ article.author }}`}</Text>
                </List.Item>
                <List.Item>
                  <Text variant="headingSm">{`{{ article.tags }}`}</Text>
                </List.Item>
              </List>
            </Box>
            <Divider borderWidth="2" />
            <Box padding={"5"}>
              <Box paddingBlockEnd={"1"}>
                <Text variant="headingSm">SHOP</Text>
              </Box>
              <List type="bullet">
                <List.Item>
                  <Text variant="headingSm">{`{{ shop.name }}`}</Text>
                </List.Item>
                <List.Item>
                  <Text variant="headingSm">{`{{ shop.domain }}`}</Text>
                </List.Item>
              </List>
            </Box>
          </AlphaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
