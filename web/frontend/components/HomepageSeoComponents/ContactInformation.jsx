import React, { useState } from "react";
import { Layout, Box, Text, AlphaCard, VerticalStack } from "@shopify/polaris";
import Switch from "../commonUI/Switch/Switch";
import { useHomeSeo } from "../../contexts/home.context";

export default function ContactInformation() {
  const { organization, setOrganization } = useHomeSeo();
  let showContact = organization?.showContact;
  const [checked, setChecked] = useState(showContact ? showContact : false);
  const handleCheckedChange = () => {
    setChecked((prev) => {
      return !prev;
    });
    setOrganization({ ...organization, showContact: !checked });
  };
  return (
    <Box paddingBlockStart={"6"} paddingBlockEnd={"5"}>
      <Layout>
        <Layout.Section oneThird>
          <Box paddingBlockEnd={"4"}>
            <Text variant="headingMd">Show Contact Inaformation</Text>
          </Box>
          <Box>
            <Text variant="bodyMd">
              Allow showing of information like phone number and address.
            </Text>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box>
            <AlphaCard>
              <VerticalStack gap={"6"}>
                <Text variant="bodyMd">
                  This will include phone and address details of your business
                  in Google JSONLD data.
                </Text>
                <VerticalStack gap={"2"}>
                  <Text variant="headingSm">Status</Text>
                  <Switch checked={checked} handleClick={handleCheckedChange} />
                </VerticalStack>
              </VerticalStack>
            </AlphaCard>
          </Box>
        </Layout.Section>
      </Layout>
    </Box>
  );
}
