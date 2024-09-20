import React, { useState } from "react";
import {
  Layout,
  Box,
  Text,
  AlphaCard,
  Select,
  VerticalStack,
  Form,
  Button,
} from "@shopify/polaris";
import { InputField } from "./commonUI/InputField";
import TextareaField from "./commonUI/TextareaField";

export default function HomeSeo() {
  const [formData, setFormData] = useState({
    seo_title: "",
    seo_description: "",
  });
  const [errors, setErrors] = useState({
    seo_title: "",
    seo_description: "",
  });
  const handleChange = (value) => {};
  return (
    <Form onSubmit={() => handleSubmit(formUpdatedData)}>
      <div className="seo_score_page_title_container">
        <div className="seo_score_page_title">Homepage SEO</div>
        <div className="">
          <Button primary submit>
            Submit
          </Button>
        </div>
      </div>
      <Box
        paddingInlineStart={"32"}
        paddingInlineEnd={"32"}
        paddingBlockStart={"4"}
      >
        <Box paddingBlockEnd={"5"}>
          <Layout>
            <Layout.Section oneThird>
              <Box paddingBlockEnd={"4"}>
                <Text variant="headingMd">Meta Title</Text>
              </Box>
              <Box>
                <Text variant="bodyMd">
                  The meta title helps with SEO by including keywords that
                  improve ranking and serve as the clickable headline in search
                  results
                </Text>
              </Box>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Box>
                <AlphaCard>
                  <VerticalStack gap={"6"}>
                    <TextareaField
                      value={formData?.seo_title}
                      onChange={handleChange}
                      type="text"
                      name="seo_title"
                      placeholder={"Enter Meta Title"}
                      label={"Enter Meta Title"}
                      error={errors?.seo_title}
                      rows={2}
                    />
                  </VerticalStack>
                </AlphaCard>
              </Box>
            </Layout.Section>
          </Layout>
        </Box>
        <Box paddingBlockEnd={"5"}>
          <Layout>
            <Layout.Section oneThird>
              <Box paddingBlockEnd={"4"}>
                <Text variant="headingMd">Meta Description</Text>
              </Box>
              <Box>
                <Text variant="bodyMd">
                  The meta description provides a brief summary that encourages
                  users to click through to your site by explaining what your
                  business offers
                </Text>
              </Box>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Box>
                <AlphaCard>
                  <VerticalStack gap={"6"}>
                    <TextareaField
                      value={formData?.seo_description}
                      onChange={handleChange}
                      label={"Enter Meta Description"}
                      type="text"
                      name="seo_description"
                      placeholder="Enter Meta Description"
                      error={errors?.seo_description}
                      rows={"5"}
                    />
                  </VerticalStack>
                </AlphaCard>
              </Box>
            </Layout.Section>
          </Layout>
        </Box>
      </Box>
    </Form>
  );
}
