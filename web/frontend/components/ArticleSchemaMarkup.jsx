import { useState, useCallback } from "react";
import {
  Box,
  Text,
  Form,
  FormLayout,
  Checkbox,
  TextField,
  Button,
  HorizontalStack,
  Thumbnail,
  VerticalStack,
  Tag,
  Select,
} from "@shopify/polaris";
import { useUI } from "../contexts/ui.context";
import { useCreateMetafield } from "../hooks/useMetafieldQuery";
import { useSingleArticleQuery } from "../hooks/useBlogsQuery";
import Switch from "./commonUI/Switch/Switch";

export function ArticleSchemaMarkup() {
  const { modal } = useUI();
  const { data } = useSingleArticleQuery({
    url: `/api/blog/articleById/${modal?.data?.info?.blog_id}/${modal?.data?.info?.id}`,
  });
  const owner = modal?.data?.info;
  const images = owner?.image ? [owner?.image] : null;
  const metaData = data?.metafields ? JSON.parse(data?.metafields.value) : null;
  const ownerMetaData = metaData?.article || null;
  const invalidationTarget = "singleArticle";
  const { mutate: createMetafield } = useCreateMetafield(invalidationTarget);
  console.log("modal", { images, owner, data, metaData });

  const [pushJson, setPushJson] = useState(metaData?.active || false);
  const [showTags, setShowTags] = useState(ownerMetaData?.showTags || false);
  const [authorUrl, setAuthorUrl] = useState(ownerMetaData?.authorUrl || null);
  const [additionalAuthors, setAdditionalAuthors] = useState(
    ownerMetaData?.additionalAuthors || []
  );
  const [audiance, setAudience] = useState(
    ownerMetaData?.audienceType || "General"
  );
  const [additionalAuthorName, setAdditionalAuthorName] = useState(null);
  const [additionalAuthorUrl, setAdditionalAuthorUrl] = useState(null);

  const handleSubmit = useCallback(() => {
    createMetafield({
      type: "article",
      owner: "ARTICLE",
      ownerId: owner?.id,
      active: pushJson,
      blogId: owner?.blog_id || null,
      data: {
        showTags,
        audienceType: audiance || null,
        authorUrl: authorUrl || null,
        additionalAuthors:
          additionalAuthors.length > 0 ? additionalAuthors : null,
      },
    });
  }, [showTags, owner, pushJson, audiance, authorUrl, additionalAuthors]);

  const handleShowTagsChange = useCallback((value) => setShowTags(value), []);
  const handlePushJsonChange = () => setPushJson((prev) => !prev);
  const handleAudienceChange = (value) => {
    setAudience(value);
  };
  const handleAuthorUrlChange = useCallback((value) => setAuthorUrl(value), []);
  const handleAdditionalAuthorNamneChange = useCallback(
    (value) => setAdditionalAuthorName(value),
    []
  );
  const handleAdditionalAuthorUrlChange = useCallback(
    (value) => setAdditionalAuthorUrl(value),
    []
  );

  const options = [
    { label: "General", value: "General" },
    { label: "Children", value: "Children" },
    { label: "Teens", value: "Teens" },
    { label: "Adults", value: "Adults" },
    { label: "Seniors", value: "Seniors" },
    { label: "Students", value: "Students" },
    { label: "Professionals", value: "Professionals" },
    { label: "Researchers", value: "Researchers" },
    { label: "Parents", value: "Parents" },
    { label: "Teachers", value: "Teachers" },
    { label: "Business", value: "Business" },
    { label: "Technologists", value: "Technologists" },
    { label: "Health Enthusiasts", value: "HealthEnthusiasts" },
    { label: "Travelers", value: "Travelers" },
    { label: "Hobbyists", value: "Hobbyists" },
    { label: "Gamers", value: "Gamers" },
    { label: "Fitness Enthusiasts", value: "FitnessEnthusiasts" },
  ];

  return (
    <Box paddingBlockStart={"2"}>
      <HorizontalStack align="space-between" ali>
        <Text variant="headingMd">Article information for Jsonld</Text>
        <div
          style={{
            display: "flex",
            gap: "0.21rem",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Text variant="headingSm">Status</Text>
          <Switch checked={pushJson} handleClick={handlePushJsonChange} />
        </div>
      </HorizontalStack>
      <Box paddingBlockStart={"4"}>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={owner?.title}
              disabled
              label="Title"
              type="text"
            />
            {images && images.length > 0 && (
              <VerticalStack gap={"2"}>
                <Text>Images</Text>
                <HorizontalStack gap={"3"}>
                  {images.map((img) => (
                    <Thumbnail source={img?.url ? img?.url : img?.src} />
                  ))}
                </HorizontalStack>
              </VerticalStack>
            )}
            <TextField
              value={authorUrl}
              label="Author information"
              type="text"
              placeholder="A link to a web page that uniquely identifies the author of the article"
              onChange={handleAuthorUrlChange}
              connectedLeft={
                <TextField disabled value={owner?.author} type="text" />
              }
            />
            {additionalAuthors.map((auth, index) => (
              <TextField
                value={auth.url}
                type="text"
                disabled
                placeholder="A link to a web page that uniquely identifies the author of the article"
                connectedLeft={
                  <TextField disabled value={auth.name} type="text" />
                }
                connectedRight={
                  <Button
                    destructive
                    onClick={() => {
                      setAdditionalAuthors((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    Remove
                  </Button>
                }
              />
            ))}
            <TextField
              value={additionalAuthorUrl}
              label="Add additional author information"
              type="text"
              placeholder="A link to a web page that uniquely identifies the author of the article"
              onChange={handleAdditionalAuthorUrlChange}
              connectedLeft={
                <TextField
                  value={additionalAuthorName}
                  placeholder="Author name"
                  type="text"
                  onChange={handleAdditionalAuthorNamneChange}
                  d
                />
              }
              connectedRight={
                <Button
                  primary
                  onClick={() => {
                    setAdditionalAuthors((prev) => [
                      ...prev,
                      {
                        name: additionalAuthorName,
                        url: additionalAuthorUrl,
                      },
                    ]);
                    setAdditionalAuthorName(null);
                    setAdditionalAuthorUrl(null);
                  }}
                >
                  Add
                </Button>
              }
            />
            <Select
              label="Set audience type"
              options={options}
              onChange={handleAudienceChange}
              value={audiance}
            />
            <Checkbox
              label={`Show article tag information`}
              checked={showTags}
              onChange={handleShowTagsChange}
            />
            <HorizontalStack align="end">
              <Button primary submit>
                Save
              </Button>
            </HorizontalStack>
          </FormLayout>
        </Form>
      </Box>
    </Box>
  );
}
