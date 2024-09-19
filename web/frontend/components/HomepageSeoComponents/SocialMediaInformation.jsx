import React from "react";
import {
  Layout,
  Box,
  Text,
  AlphaCard,
  VerticalStack,
  TextField,
} from "@shopify/polaris";
import { useHomeSeo } from "../../contexts/home.context";

export default function SocialMediaInformation() {
  const { organization, setOrganization } = useHomeSeo();

  const handleFacebookChange = (value) => {
    setOrganization({
      ...organization,
      socialLinks: { ...organization?.socialLinks, facebook: value },
    });
  };
  const handleTwitterChange = (value) => {
    setOrganization({
      ...organization,
      socialLinks: { ...organization?.socialLinks, twitter: value },
    });
  };
  const handleInstagramChange = (value) => {
    setOrganization({
      ...organization,
      socialLinks: { ...organization?.socialLinks, instagram: value },
    });
  };
  const handleYoutubeChange = (value) => {
    setOrganization({
      ...organization,
      socialLinks: { ...organization?.socialLinks, youtube: value },
    });
  };
  const handlePinterestChange = (value) => {
    setOrganization({
      ...organization,
      socialLinks: { ...organization?.socialLinks, pinterest: value },
    });
  };
  const handleLinkedinChange = (value) => {
    setOrganization({
      ...organization,
      socialLinks: { ...organization?.socialLinks, linkedin: value },
    });
  };
  const handleSnapchatChange = (value) => {
    setOrganization({
      ...organization,
      socialLinks: { ...organization?.socialLinks, snapchat: value },
    });
  };
  const handleTiktokChange = (value) => {
    setOrganization({
      ...organization,
      socialLinks: { ...organization?.socialLinks, tiktok: value },
    });
  };

  return (
    <Box paddingBlockStart={"6"} paddingBlockEnd={"5"}>
      <Layout>
        <Layout.Section oneThird>
          <Box paddingBlockEnd={"4"}>
            <Text variant="headingMd">Social Media Profiles</Text>
          </Box>
          <Box>
            <Text variant="bodyMd">
              Let search engines like Google know you have a social media
              presence and a real company.
            </Text>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box>
            <AlphaCard>
              <VerticalStack gap={"4"}>
                <TextField
                  label="Facebook page URL"
                  value={organization?.socialLinks?.facebook}
                  placeholder="https://facebook.com/"
                  onChange={handleFacebookChange}
                ></TextField>
                <TextField
                  label="Twitter URL"
                  value={organization?.socialLinks?.twitter}
                  placeholder="https://twitter.com/"
                  onChange={handleTwitterChange}
                ></TextField>
                <TextField
                  label="Instagram URL"
                  value={organization?.socialLinks?.instagram}
                  placeholder="https://instagram.com/"
                  onChange={handleInstagramChange}
                ></TextField>
                <TextField
                  label="Youtube URL"
                  value={organization?.socialLinks?.youtube}
                  placeholder="https://youytube.com/channel/"
                  onChange={handleYoutubeChange}
                ></TextField>
                <TextField
                  label="Pinterest URL"
                  value={organization?.socialLinks?.pinterest}
                  placeholder="https://pinterest.com/"
                  onChange={handlePinterestChange}
                ></TextField>
                <TextField
                  label="LinkedIn URL"
                  value={organization?.socialLinks?.linkedin}
                  placeholder="https://linkedin.com/"
                  onChange={handleLinkedinChange}
                ></TextField>
                <TextField
                  label="Snapchat URL"
                  value={organization?.socialLinks?.snapchat}
                  placeholder="https://snapchat.com/"
                  onChange={handleSnapchatChange}
                ></TextField>
                <TextField
                  label="TikTok URL"
                  value={organization?.socialLinks?.tiktok}
                  placeholder="https://tiktok.com/"
                  onChange={handleTiktokChange}
                ></TextField>
              </VerticalStack>
            </AlphaCard>
          </Box>
        </Layout.Section>
      </Layout>
    </Box>
  );
}
