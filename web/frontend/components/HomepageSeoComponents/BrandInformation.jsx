import React, { useCallback, useState } from "react";
import {
  Layout,
  Box,
  Text,
  AlphaCard,
  VerticalStack,
  TextField,
  Checkbox,
} from "@shopify/polaris";

export default function BrandInformation() {
  const [checked, setChecked] = useState(false);
  const [otherIndustry, setOtherIndustry] = useState(null);
  const handleTextFieldChange = useCallback(
    (value) => setOtherIndustry(value),
    []
  );
  const handleCheckboxChange = useCallback(
    (newChecked) => setChecked(newChecked),
    []
  );

  return (
    <Box paddingBlockStart={"6"} paddingBlockEnd={"5"}>
      <Layout>
        <Layout.Section oneThird>
          <Box paddingBlockEnd={"4"}>
            <Text variant="headingMd">Brand Inaformation</Text>
          </Box>
          <Box>
            <Text variant="bodyMd">
              Set your Brand Information here. This will be used uniformly
              across your SEO best practices.
            </Text>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box>
            <AlphaCard>
              <VerticalStack gap={"6"}>
                <TextField
                  label="Brand Name"
                  value={otherIndustry}
                  placeholder="Some really cool brand name"
                  onChange={handleTextFieldChange}
                ></TextField>
                <Checkbox
                  label="has separate brand logo"
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
                {checked && (
                  <TextField
                    label="Brand Logo URL"
                    value={otherIndustry}
                    placeholder="Paste your brand logo URL here"
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
