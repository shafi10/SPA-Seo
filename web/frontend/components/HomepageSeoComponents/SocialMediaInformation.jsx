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

export default function SocialMediaInformation() {
  const { organization, setOrganization } = useHomeSeo();
  let socialMediaLinks = organization?.socialMedia;

  const [facebook, setFacebook] = useState(
    socialMediaLinks ? socialMediaLinks.facebook : null
  );
  const [twitter, setTwitter] = useState(
    socialMediaLinks ? socialMediaLinks.twitter : null
  );
  const [instagram, setInstagram] = useState(
    socialMediaLinks ? socialMediaLinks.instagram : null
  );
  const [youtube, setYoutube] = useState(
    socialMediaLinks ? socialMediaLinks.youtube : null
  );
  const [pinterest, setPinterest] = useState(
    socialMediaLinks ? socialMediaLinks.pinterest : null
  );
  const [linkedin, setLinkedin] = useState(
    socialMediaLinks ? socialMediaLinks.linkedin : null
  );
  const [snapchat, setSnapchat] = useState(
    socialMediaLinks ? socialMediaLinks.snapchat : null
  );
  const [tiktok, setTiktok] = useState(
    socialMediaLinks ? socialMediaLinks.tiktok : null
  );

  const handleFacebookChange = (value) => {
    setFacebook(value);
    setOrganization({
      ...organization,
      socialMedia: { ...organization?.socialMedia, facebook: value },
    });
  };
  const handleTwitterChange = (value) => {
    setTwitter(value);
    setOrganization({
      ...organization,
      socialMedia: { ...organization?.socialMedia, twitter: value },
    });
  };
  const handleInstagramChange = (value) => {
    setInstagram(value);
    setOrganization({
      ...organization,
      socialMedia: { ...organization?.socialMedia, instagram: value },
    });
  };
  const handleYoutubeChange = (value) => {
    setYoutube(value);
    setOrganization({
      ...organization,
      socialMedia: { ...organization?.socialMedia, youtube: value },
    });
  };
  const handlePinterestChange = (value) => {
    setPinterest(value);
    setOrganization({
      ...organization,
      socialMedia: { ...organization?.socialMedia, pinterest: value },
    });
  };
  const handleLinkedinChange = (value) => {
    setLinkedin(value);
    setOrganization({
      ...organization,
      socialMedia: { ...organization?.socialMedia, linkedin: value },
    });
  };
  const handleSnapchatChange = (value) => {
    setSnapchat(value);
    setOrganization({
      ...organization,
      socialMedia: { ...organization?.socialMedia, snapchat: value },
    });
  };
  const handleTiktokChange = (value) => {
    setTiktok(value);
    setOrganization({
      ...organization,
      socialMedia: { ...organization?.socialMedia, snapchat: value },
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
                  value={facebook}
                  placeholder="https://facebook.com/"
                  onChange={handleFacebookChange}
                ></TextField>
                <TextField
                  label="Twitter URL"
                  value={twitter}
                  placeholder="https://twitter.com/"
                  onChange={handleTwitterChange}
                ></TextField>
                <TextField
                  label="Instagram URL"
                  value={instagram}
                  placeholder="https://instagram.com/"
                  onChange={handleInstagramChange}
                ></TextField>
                <TextField
                  label="Youtube URL"
                  value={youtube}
                  placeholder="https://youytube.com/channel/"
                  onChange={handleYoutubeChange}
                ></TextField>
                <TextField
                  label="Pinterest URL"
                  value={pinterest}
                  placeholder="https://pinterest.com/"
                  onChange={handlePinterestChange}
                ></TextField>
                <TextField
                  label="LinkedIn URL"
                  value={linkedin}
                  placeholder="https://linkedin.com/"
                  onChange={handleLinkedinChange}
                ></TextField>
                <TextField
                  label="Snapchat URL"
                  value={snapchat}
                  placeholder="https://snapchat.com/"
                  onChange={handleSnapchatChange}
                ></TextField>
                <TextField
                  label="TikTok URL"
                  value={tiktok}
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
