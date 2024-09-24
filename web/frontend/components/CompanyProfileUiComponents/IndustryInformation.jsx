import React, { useCallback, useState } from "react";
import {
  Layout,
  Box,
  Text,
  AlphaCard,
  Select,
  VerticalStack,
  TextField,
} from "@shopify/polaris";
import { useHomeSeo } from "../../contexts/home.context";

export default function IndustryInformation() {
  const { organization, setOrganization } = useHomeSeo();
  const handleSelectChange = (value) => {
    setOrganization({ ...organization, industry: value });
  };
  const handleTextFieldChange = (value) => {
    setOrganization({ ...organization, industry: value });
  };

  const options = [
    {
      label: "Store",
      value: "store",
    },
    { label: "Arts and Crafts", value: "arts-and-crafts" },
    { label: "Baby and Kids", value: "baby-and-kids" },
    { label: "Books, Music and Video", value: "books-music-and-video" },
    {
      label: "Business equipment and Supplies",
      value: "business-equipment-and-supplies",
    },
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Food and Drink", value: "food-and-drink" },
    { label: "Hardware and Automotive", value: "hardware-and-automotive" },
    { label: "Health and Beauty", value: "health-and-beauty" },
    { label: "Home and Decor", value: "home-and-decor" },
    { label: "Jewelry and Accessories", value: "jewelry-and-accessories" },
    { label: "Outdoor and Garden", value: "outdoor-and-garden" },
    { label: "Pet supplies", value: "pet-supplies" },
    { label: "Restaurants", value: "restaurants" },
    { label: "Services", value: "services" },
    { label: "Sports and Recreation", value: "sports-and-recreation" },
    { label: "Toys and Games", value: "toys-and-games" },
    {
      label: "Other",
      value: "other",
    },
  ];

  function getIndustryLabel(value) {
    const industry = options.find((option) => option.value === value);
    return industry ? industry.label : "Other";
  }

  function getIndustryValue(value) {
    const industry = options.find((option) => option.value === value);
    return industry ? industry.value : "other";
  }

  return (
    <Box paddingBlockStart={"5"} paddingBlockEnd={"5"}>
      <Layout>
        <Layout.Section oneThird>
          <Box paddingBlockEnd={"4"}>
            <Text variant="headingMd">Industry</Text>
          </Box>
          <Box>
            <Text variant="bodyMd">
              Let search engines like Google know your industry
            </Text>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box>
            <AlphaCard>
              <VerticalStack gap={"6"}>
                <Select
                  helpText="Not sure what to choose? Use 'Store' as a default."
                  label="Select industry"
                  options={options}
                  onChange={handleSelectChange}
                  value={getIndustryValue(organization?.industry)}
                />
                {getIndustryLabel(organization?.industry) == "Other" && (
                  <TextField
                    value={organization?.industry}
                    placeholder="Enter industry"
                    onChange={handleTextFieldChange}
                  ></TextField>
                )}
              </VerticalStack>
            </AlphaCard>
          </Box>
        </Layout.Section>
      </Layout>
    </Box>
  );
}
