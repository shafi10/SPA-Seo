import React, { useCallback, useState } from "react";
import {
  Layout,
  Box,
  Text,
  AlphaCard,
  VerticalStack,
  TextField,
} from "@shopify/polaris";

export default function CompanyLogoInformation() {
  const [logourl, setLogoUrl] = useState(null);

  const handleLogoUrlChange = useCallback((value) => setLogoUrl(value), []);

  return (
    <Box paddingBlockStart={"6"} paddingBlockEnd={"5"}>
      <Layout>
        <Layout.Section oneThird>
          <Box paddingBlockEnd={"4"}>
            <Text variant="headingMd">Company Logo URL</Text>
          </Box>
          <Box>
            <Text variant="bodyMd">
              Search engines like Google will enhance certain search results by
              displaying your logo.
            </Text>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box>
            <AlphaCard>
              <VerticalStack gap={"4"}>
                <Text variant="headingSm">Company logo URL</Text>
                <TextField
                  helpText="This is an optional step, we'll find your logo automatically if you leave this empty."
                  value={logourl}
                  placeholder="Paste your company logo URL here"
                  onChange={handleLogoUrlChange}
                ></TextField>
              </VerticalStack>
            </AlphaCard>
          </Box>
        </Layout.Section>
      </Layout>
    </Box>
  );
}
