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
import { useHomeSeo } from "../../contexts/home.context";

export default function BrandInformation() {
  const { organization, setOrganization } = useHomeSeo();
  let name = organization?.name,
    bLogo = organization?.brandLogo;
  const [checked, setChecked] = useState(bLogo ? true : false);
  const [brandLogo, setBrandLogo] = useState(bLogo ? bLogo : null);
  const [otherIndustry, setOtherIndustry] = useState(name ? name : null);
  const handleTextFieldChange = (value) => {
    setOtherIndustry(value);
    setOrganization({ ...organization, name: value });
  };
  const handleCheckboxChange = (newChecked) => {
    setChecked(newChecked);
    if (!newChecked) setOrganization({ ...organization, brandLogo: null });
  };
  const handleBrandLogoChange = (value) => {
    setBrandLogo(value);
    if (checked) setOrganization({ ...organization, brandLogo: value });
  };

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
                    value={brandLogo}
                    placeholder="Paste your brand logo URL here"
                    onChange={handleBrandLogoChange}
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
