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
  InlineError,
  VerticalStack,
  Tag,
} from "@shopify/polaris";
import { useUI } from "../contexts/ui.context";
import { useCreateMetafield } from "../hooks/useMetafieldQuery";
import StarRating from "./commonUI/StarRating/StarRating";
import Switch from "./commonUI/Switch/Switch";

export function GenerateJsonld({ obj_type }) {
  const { modal, shop } = useUI();
  const owner = modal?.data?.info;
  const images =
    obj_type?.toLowerCase() == "product"
      ? owner?.images.edges.map((e) => e.node)
      : obj_type?.toLowerCase() == "collection" && owner?.image
      ? [owner?.image]
      : null;
  const metaData = owner?.metafield
    ? JSON.parse(owner?.metafield?.value)
    : null;
  const ownerMetaData = metaData?.[`${obj_type?.toLowerCase()}`] || null;

  const invalidationTarget =
    obj_type?.toLowerCase() == "product"
      ? "productList"
      : obj_type?.toLowerCase() == "collection"
      ? "collectionList"
      : "metafieldList";
  const { mutate: createMetafield } = useCreateMetafield(invalidationTarget);

  const [pushJson, setPushJson] = useState(metaData?.active || false);
  const [showTags, setShowTags] = useState(ownerMetaData?.showTags || false);
  const [rating, setRating] = useState(ownerMetaData?.rating || 0);
  const [reviewCount, setReviewCount] = useState(
    ownerMetaData?.reviewCount || 0
  );
  const [keywordsInput, setKeywordsInput] = useState("");
  const [keywords, setKeywords] = useState(
    ownerMetaData?.keywords?.split(",") || []
  );

  const handleSubmit = useCallback(() => {
    createMetafield({
      type: obj_type.toLowerCase(),
      owner: obj_type.toUpperCase(),
      ownerId: owner?.id,
      active: pushJson,
      data: {
        showTags,
        rating: rating,
        reviewCount: reviewCount,
        keywords: keywords.join(","),
      },
    });
  }, [rating, reviewCount, showTags, owner, pushJson, keywords]);

  const handleShowTagsChange = useCallback((value) => setShowTags(value), []);
  const handleRatingChange = useCallback((value) => setRating(value), []);
  const handlePushJsonChange = () => setPushJson((prev) => !prev);
  const handleKeywordsChange = useCallback(
    (value) => setKeywordsInput(value),
    []
  );
  const handleReviewCountChange = useCallback(
    (value) => setReviewCount(value),
    []
  );
  const handleRemoveKeyword = (index) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };
  const handleAddKeyword = (val) => {
    setKeywords([...keywords, val]);
  };
  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <Box paddingBlockStart={"2"}>
      <HorizontalStack align="space-between" ali>
        <Text variant="headingMd">{obj_type} information for Jsonld</Text>
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
            <TextField
              value={owner?.description}
              disabled
              multiline={3}
              label={`${obj_type} description`}
              type="text"
            />
            {obj_type.toLowerCase() == "product" && (
              <TextField
                label={`Vendor`}
                type="text"
                disabled
                value={owner?.vendor}
              />
            )}
            {obj_type.toLowerCase() == "collection" && (
              <VerticalStack gap={"3"}>
                <TextField
                  value={keywordsInput}
                  onChange={handleKeywordsChange}
                  label={`Keywords`}
                  type="text"
                  connectedRight={
                    keywordsInput &&
                    keywords.length > 0 && (
                      <Button
                        primary
                        onClick={() => {
                          if (keywordsInput.length > 0) {
                            handleAddKeyword(keywordsInput);
                            setKeywordsInput("");
                          }
                        }}
                      >
                        Add
                      </Button>
                    )
                  }
                />
                <HorizontalStack gap={"2"}>
                  {keywords &&
                    keywords.length > 0 &&
                    keywords.map((k, index) => (
                      <Tag
                        key={index}
                        onRemove={() => handleRemoveKeyword(index)}
                      >
                        {k}
                      </Tag>
                    ))}
                </HorizontalStack>
              </VerticalStack>
            )}
            {images && images.length > 0 && (
              <VerticalStack gap={"2"}>
                <Text>Images</Text>
                <HorizontalStack gap={"3"}>
                  {images.map((img) => (
                    <Thumbnail source={img?.url} />
                  ))}
                </HorizontalStack>
              </VerticalStack>
            )}
            {obj_type.toLowerCase() == "product" && (
              <HorizontalStack gap={"4"} blockAlign="center">
                <TextField
                  value={rating}
                  onChange={handleRatingChange}
                  label="Aggregated rating"
                  type="number"
                />
                <StarRating
                  size={30}
                  rating={rating}
                  onRate={handleStarClick}
                />
              </HorizontalStack>
            )}
            {obj_type.toLowerCase() == "product" && (
              <TextField
                value={reviewCount}
                onChange={handleReviewCountChange}
                label={`Review count`}
                type="integer"
              />
            )}
            {obj_type.toLowerCase() == "product" && (
              <Checkbox
                label="Show product tag information"
                checked={showTags}
                onChange={handleShowTagsChange}
              />
            )}
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
