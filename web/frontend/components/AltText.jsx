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
import { Spinners } from "./Spinner";
import {
  useImageOptimizerQuery,
  useSaveImageOptimizerSettings,
} from "../hooks/useImageOptimizer";

export function AltText() {
  const { data, isSuccess, isLoading } = useImageOptimizerQuery({
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
  const [productAltStatus, setProductAltStatus] = useState(false);
  const [collectionAltStatus, setCollectionAltStatus] = useState(false);
  const [articleAltStatus, setArticleAltStatus] = useState(false);

  const [shopImageAltStatus, setShopImageAltStatus] = useState(false);
  const [shopImageFilenameStatus, setShopImageFilenameStatus] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const metadata = data.data;
      setProductImageAlt(metadata.altText.product);
      setCollectionImageAlt(metadata.altText.collection);
      setArticleImageAlt(metadata.altText.article);
      setProductAltStatus(metadata.altText.productStatus);
      setCollectionAltStatus(metadata.altText.collectionStatus);
      setArticleAltStatus(metadata.altText.articleStatus);
    }
  }, [isSuccess]);

  const handleShopImageAltStatusChange = () =>
    setShopImageAltStatus((prev) => !prev);
  const handleParoductAltStatusChange = () =>
    setProductAltStatus((prev) => !prev);
  const handleCollectionAltStatusChange = () =>
    setCollectionAltStatus((prev) => !prev);
  const handleArticleAltStatusChange = () =>
    setArticleAltStatus((prev) => !prev);

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
      type: "altText",
      data: {
        product: productImageAlt,
        productStatus: productAltStatus,
        collection: collectionImgeAlt,
        collectionStatus: collectionAltStatus,
        article: articleImageAlt,
        articleStatus: articleAltStatus,
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <Spinners />
      ) : (
        <Page
          fullWidth
          title="Image Alt Optimization"
          subtitle="Alt tags helps you improve accessibility, relevance between images and content, and increase the ability to rank high in Google Images."
          primaryAction={
            <Button primary submit onClick={handleSubmit}>
              Save
            </Button>
          }
          secondaryActions={[
            {
              content: (
                <Button
                  plain
                  onClick={() => {
                    setProductImageAlt("{{ product.title }} {{ shop.name }}");
                    setArticleImageAlt("{{ article.title }} {{ shop.name }}");
                    setCollectionImageAlt(
                      "{{ collection.title }} {{ shop.name }}"
                    );
                  }}
                >
                  Restore default
                </Button>
              ),
            },
          ]}
        >
          <Box paddingBlockStart={"2"}>
            <Layout>
              <Layout.Section>
                <Form onSubmit={handleSubmit}>
                  <VerticalStack gap={"4"}>
                    <Box>
                      <Layout>
                        <Layout.Section oneThird>
                          <VerticalStack>
                            <Text variant="headingMd">Product Image Alt</Text>
                            <Text variant="bodyMd">
                              Can use variables in the PRODUCT and SHOP section
                            </Text>
                            <Box paddingBlockStart={"4"}>
                              <Switch
                                checked={productAltStatus}
                                handleClick={handleParoductAltStatusChange}
                              />
                            </Box>
                          </VerticalStack>
                        </Layout.Section>
                        <Layout.Section>
                          <Box>
                            <AlphaCard>
                              <FormLayout>
                                <TextField
                                  value={productImageAlt}
                                  onChange={handleProductImageAltChange}
                                  label={
                                    <Text variant="headingSm">Alt Text</Text>
                                  }
                                  placeholder="{{ product.title }} {{ shop.name }}"
                                  helpText="Can use variables in the PRODUCT and SHOP section"
                                  type="text"
                                />
                              </FormLayout>
                            </AlphaCard>
                          </Box>
                        </Layout.Section>
                      </Layout>
                    </Box>
                    <Divider borderWidth="1" />
                    <Box>
                      <Layout>
                        <Layout.Section oneThird>
                          <VerticalStack>
                            <Text variant="headingMd">
                              Collection Image Alt
                            </Text>
                            <Text variant="bodyMd">
                              Can use variables in the COLLECTION and SHOP
                              section
                            </Text>
                            <Box paddingBlockStart={"4"}>
                              <Switch
                                checked={collectionAltStatus}
                                handleClick={handleCollectionAltStatusChange}
                              />
                            </Box>
                          </VerticalStack>
                        </Layout.Section>
                        <Layout.Section>
                          <Box>
                            <AlphaCard>
                              <FormLayout>
                                <TextField
                                  value={collectionImgeAlt}
                                  onChange={handleCollectionImageAltChange}
                                  label={
                                    <Text variant="headingSm">Alt Text</Text>
                                  }
                                  placeholder="{{ collection.title }} {{ shop.name }}"
                                  helpText="Can use variables in the COLLECTION and SHOP section"
                                  type="text"
                                />
                              </FormLayout>
                            </AlphaCard>
                          </Box>
                        </Layout.Section>
                      </Layout>
                    </Box>
                    <Divider borderWidth="1" />
                    <Box>
                      <Layout>
                        <Layout.Section oneThird>
                          <VerticalStack>
                            <Text variant="headingMd">Blog Post Image Alt</Text>
                            <Text variant="bodyMd">
                              Can use variables in the BLOG POST and SHOP
                              section
                            </Text>
                            <Box paddingBlockStart={"4"}>
                              <Switch
                                checked={articleAltStatus}
                                handleClick={handleArticleAltStatusChange}
                              />
                            </Box>
                          </VerticalStack>
                        </Layout.Section>
                        <Layout.Section>
                          <Box>
                            <AlphaCard>
                              <FormLayout>
                                <TextField
                                  value={articleImageAlt}
                                  onChange={handleArticleImageAltChange}
                                  label={
                                    <Text variant="headingSm">Alt Text</Text>
                                  }
                                  placeholder="{{ article.title }} {{ shop.name }}"
                                  helpText="Can use variables in the BLOG POST and SHOP section"
                                  type="text"
                                />
                              </FormLayout>
                            </AlphaCard>
                          </Box>
                        </Layout.Section>
                      </Layout>
                    </Box>
                  </VerticalStack>
                </Form>
              </Layout.Section>
              <Layout.Section oneThird>
                <VerticalStack gap={"4"}>
                  <AlphaCard>
                    <Text variant="bodyMd">
                      You can use the following variables in the image alt and
                      filename fields to dynamically generate the content based
                      on the product, collection, blog post, and shop
                      information.
                    </Text>
                    <Box paddingBlockStart={"3"}>
                      <Text variant="bodyMd" fontWeight="bold">
                        Use the following variables exactly as listed, including
                        whitespace, to set image alt text.
                      </Text>
                    </Box>
                  </AlphaCard>
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
                </VerticalStack>
              </Layout.Section>
            </Layout>
          </Box>
        </Page>
      )}
    </>
  );
}
