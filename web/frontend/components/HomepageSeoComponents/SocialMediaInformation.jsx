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

export default function SocialMediaInformation() {
  const [facebook, setFacebook] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [youtube, setYoutube] = useState(null);
  const [pinterest, setPinterest] = useState(null);
  const [linkedin, setLinkedin] = useState(null);
  const [snapchat, setSnapchat] = useState(null);
  const [tiktok, setTiktok] = useState(null);

  const handleFacebookChange = useCallback((value) => setFacebook(value), []);
  const handleTwitterChange = useCallback((value) => setTwitter(value), []);
  const handleInstagramChange = useCallback((value) => setInstagram(value), []);
  const handleYoutubeChange = useCallback((value) => setYoutube(value), []);
  const handlePinterestChange = useCallback((value) => setPinterest(value), []);
  const handleLinkedinChange = useCallback((value) => setLinkedin(value), []);
  const handleSnapchatChange = useCallback((value) => setSnapchat(value), []);
  const handleTiktokChange = useCallback((value) => setTiktok(value), []);

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
