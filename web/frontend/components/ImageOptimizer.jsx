import React, { useState, useCallback, useEffect } from "react";
import {
  Page,
  Layout,
  AlphaCard,
  Box,
  Text,
  Divider,
  List,
  HorizontalStack,
  VerticalStack,
  Form,
  FormLayout,
  TextField,
  Collapsible,
  Button,
} from "@shopify/polaris";
import Switch from "./commonUI/Switch/Switch";
import {
  useImageOptimizerQuery,
  useSaveImageOptimizerSettings,
} from "../hooks/useImageOptimizer";

export function ImageOptimizer() {
  const { data, isSuccess } = useImageOptimizerQuery({
    url: "/api/metafields/get/image-optimizer",
  });

  const { mutate: saveImageOptimizerSettings } =
    useSaveImageOptimizerSettings();

  const [productImageAlt, setProductImageAlt] = useState(
    "{{ product.title }} {{ shop.name }}"
  );
  const [collectionImgeAlt, setCollectionImageAlt] = useState(
    "{{ collection.title }} {{ shop.name }}"
  );
  const [articleImageAlt, setArticleImageAlt] = useState(
    "{{ article.title }} {{ shop.name }}"
  );
  const [productImageFilename, setProductImageFilename] = useState(
    "{{ product.title }} {{ shop.name }}"
  );
  const [collectionImgeFilename, setCollectionImageFilename] = useState(
    "{{ collection.title }} {{ shop.name }}"
  );
  const [articleImageFilename, setArticleImageFilename] = useState(
    "{{ article.title }} {{ shop.name }}"
  );
  const [shopImageAltStatus, setShopImageAltStatus] = useState(false);
  const [shopImageFilenameStatus, setShopImageFilenameStatus] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const metadata = data.data;
      setProductImageAlt(metadata.altText.product);
      setCollectionImageAlt(metadata.altText.collection);
      setArticleImageAlt(metadata.altText.article);
      setProductImageFilename(metadata.fileName.product);
      setCollectionImageFilename(metadata.fileName.collection);
      setArticleImageFilename(metadata.fileName.article);
      setShopImageAltStatus(metadata.altText.status);
      setShopImageFilenameStatus(metadata.fileName.status);
    }
  }, [isSuccess]);

  const handleShopImageAltStatusChange = () =>
    setShopImageAltStatus((prev) => !prev);
  const handleShopImageFilenameStatusChange = () =>
    setShopImageFilenameStatus((prev) => !prev);

  const handleProductImageAltChange = useCallback(
    (value) => setProductImageAlt(value),
    []
  );
  const handleCollectionImageAltChange = useCallback(
    (value) => setCollectionImageAlt(value),
    []
  );
  const handleArticleImageAltChange = useCallback(
    (value) => setArticleImageAlt(value),
    []
  );
  const handleProductImageFilenameChange = useCallback(
    (value) => setProductImageFilename(value),
    []
  );
  const handleCollectionImageFilenameChange = useCallback(
    (value) => setCollectionImageFilename(value),
    []
  );
  const handleArticleImageFilenameChange = useCallback(
    (value) => setArticleImageFilename(value),
    []
  );

  const handleSubmit = () => {
    saveImageOptimizerSettings({
      data: {
        altText: {
          status: shopImageAltStatus,
          product: productImageAlt,
          collection: collectionImgeAlt,
          article: articleImageAlt,
        },
        fileName: {
          status: shopImageFilenameStatus,
          product: productImageFilename,
          collection: collectionImgeFilename,
          article: articleImageFilename,
        },
      },
    });
  };

  return (
    <Page
      fullWidth
      title="Settings"
      primaryAction={
        <Button primary submit onClick={handleSubmit}>
          Save
        </Button>
      }
    >
      <Layout>
        <Layout.Section>
          <Form onSubmit={handleSubmit}>
            <VerticalStack gap={"4"}>
              <AlphaCard>
                <Box paddingBlockEnd={shopImageAltStatus ? "2" : "0"}>
                  <HorizontalStack align="space-between">
                    <Text variant="headingMd">Image Alt Optimization</Text>
                    <HorizontalStack blockAlign="center" gap={"2"}>
                      <Button
                        plain
                        onClick={() => {
                          setProductImageAlt(
                            "{{ product.title }} {{ shop.name }}"
                          );
                          setArticleImageAlt(
                            "{{ article.title }} {{ shop.name }}"
                          );
                          setCollectionImageAlt(
                            "{{ collection.title }} {{ shop.name }}"
                          );
                        }}
                      >
                        Restore default
                      </Button>
                      <Switch
                        checked={shopImageAltStatus}
                        handleClick={handleShopImageAltStatusChange}
                      />
                    </HorizontalStack>
                  </HorizontalStack>
                </Box>
                <Collapsible open={shopImageAltStatus}>
                  <Box paddingBlockEnd={"1"}>
                    <Text variant="bodyMd">
                      Alt tags helps you improve accessibility, relevance
                      between images and content, and increase the ability to
                      rank high in Google Images.
                    </Text>
                  </Box>
                  <Box paddingBlockStart={"4"}>
                    <FormLayout>
                      <TextField
                        value={productImageAlt}
                        onChange={handleProductImageAltChange}
                        label={
                          <Text variant="headingSm">Product Image Alt</Text>
                        }
                        placeholder="{{ product.title }} {{ shop.name }}"
                        helpText="Can use variables in the PRODUCT and SHOP section"
                        type="text"
                      />
                      <TextField
                        value={collectionImgeAlt}
                        onChange={handleCollectionImageAltChange}
                        label={
                          <Text variant="headingSm">Collection Image Alt</Text>
                        }
                        placeholder="{{ collection.title }} {{ shop.name }}"
                        helpText="Can use variables in the COLLECTION and SHOP section"
                        type="text"
                      />
                      <TextField
                        value={articleImageAlt}
                        onChange={handleArticleImageAltChange}
                        label={
                          <Text variant="headingSm">Blog Post Image Alt</Text>
                        }
                        placeholder="{{ article.title }} {{ shop.name }}"
                        helpText="Can use variables in the BLOG POST and SHOP section"
                        type="text"
                      />
                    </FormLayout>
                  </Box>
                </Collapsible>
              </AlphaCard>
              <AlphaCard>
                <Box paddingBlockEnd={shopImageFilenameStatus ? "2" : "0"}>
                  <HorizontalStack align="space-between">
                    <Text variant="headingMd">Image Filename</Text>
                    <HorizontalStack blockAlign="center" gap={"2"}>
                      <Button
                        plain
                        onClick={() => {
                          setProductImageFilename(
                            "{{ product.title }} {{ shop.name }}"
                          );
                          setArticleImageFilename(
                            "{{ article.title }} {{ shop.name }}"
                          );
                          setCollectionImageFilename(
                            "{{ collection.title }} {{ shop.name }}"
                          );
                        }}
                      >
                        Restore default
                      </Button>
                      <Switch
                        checked={shopImageFilenameStatus}
                        handleClick={handleShopImageFilenameStatusChange}
                      />
                    </HorizontalStack>
                  </HorizontalStack>
                </Box>
                <Collapsible open={shopImageFilenameStatus}>
                  <Box paddingBlockEnd={"1"}>
                    <Text variant="bodyMd">
                      To get high search engine rankings, the image file name
                      should be related to the product or article content and
                      contain the target keyword.
                    </Text>
                  </Box>
                  <Box paddingBlockStart={"4"}>
                    <FormLayout>
                      <TextField
                        value={productImageFilename}
                        onChange={handleProductImageFilenameChange}
                        label={
                          <Text variant="headingSm">
                            Product Image Filename
                          </Text>
                        }
                        placeholder="{{ product.title }} {{ shop.name }}"
                        helpText="Can use variables in the PRODUCT and SHOP section"
                        type="text"
                      />
                      <TextField
                        value={collectionImgeFilename}
                        onChange={handleCollectionImageFilenameChange}
                        label={
                          <Text variant="headingSm">
                            Collection Image Filename
                          </Text>
                        }
                        placeholder="{{ collection.title }} {{ shop.name }}"
                        helpText="Can use variables in the COLLECTION and SHOP section"
                        type="text"
                      />
                      <TextField
                        value={articleImageFilename}
                        onChange={handleArticleImageFilenameChange}
                        label={
                          <Text variant="headingSm">
                            Blog Post Image Filename
                          </Text>
                        }
                        placeholder="{{ article.title }} {{ shop.name }}"
                        helpText="Can use variables in the BLOG POST and SHOP section"
                        type="text"
                      />
                    </FormLayout>
                  </Box>
                </Collapsible>
              </AlphaCard>
            </VerticalStack>
          </Form>
        </Layout.Section>
        <Layout.Section oneThird>
          <AlphaCard padding={"0"}>
            <Box padding={"5"}>
              <Text variant="headingMd">Variables</Text>
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
                  <Text variant="headingSm">{`{{ product.type }}`}</Text>
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
