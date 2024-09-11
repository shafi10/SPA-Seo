import React, { useCallback, useState } from "react";
import {
  Layout,
  Box,
  Text,
  AlphaCard,
  Select,
  Icon,
  VerticalStack,
  TextField,
} from "@shopify/polaris";
import { EditMajor } from "@shopify/polaris-icons";

export default function IndustryInformation() {
  const [selected, setSelected] = useState("store");
  const [otherIndustry, setOtherIndustry] = useState(null);
  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const handleTextFieldChange = useCallback(
    (value) => setOtherIndustry(value),
    []
  );

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
  return (
    <Box paddingBlockEnd={"5"}>
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
                  value={selected}
                />
                {selected == "other" && (
                  <TextField
                    value={otherIndustry}
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
