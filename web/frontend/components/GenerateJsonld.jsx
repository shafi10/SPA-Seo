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
} from "@shopify/polaris";
import { useUI } from "../contexts/ui.context";
import { useCreateMetafield } from "../hooks/useMetafieldQuery";
import StarRating from "./commonUI/StarRating/StarRating";

export function GenerateJsonld({ obj_type }) {
  const { modal, shop } = useUI();
  const owner = modal?.data?.info;
  const metaTitle = owner?.seo?.title;
  const metaDescription = owner?.seo?.description;

  const { mutate: createMetafield, isError } = useCreateMetafield();

  const [title, setTitle] = useState(metaTitle);
  const [description, setDescription] = useState(metaDescription);
  const [imageUrl, setImageUrl] = useState(owner?.featuredImage?.url);
  const [showTags, setShowTags] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  console.log("owner", owner);

  const handleSubmit = useCallback(() => {
    console.log({ reviewCount, rating });
    createMetafield({
      type: obj_type.toLowerCase(),
      owner: obj_type.toUpperCase(),
      ownerId: owner?.id,
      data: {
        title,
        description,
        imageUrl,
        showTags,
        rating: rating,
        reviewCount: reviewCount,
      },
    });
  }, [rating, reviewCount, title, description, imageUrl, showTags]);

  const handleTitleChange = useCallback((value) => setTitle(value), []);
  const handleImageUrlChange = useCallback((value) => setImageUrl(value), []);
  const handleShowTagsChange = useCallback((value) => setShowTags(value), []);
  const handleRatingChange = useCallback((value) => setRating(value), []);
  const handleReviewCountChange = useCallback(
    (value) => setReviewCount(value),
    []
  );
  const handleDescriptionChange = useCallback(
    (value) => setDescription(value),
    []
  );

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <Box paddingBlockStart={"2"}>
      <Text variant="headingMd">{obj_type} meta information for Jsonld</Text>
      <Box paddingBlockStart={"4"}>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={title}
              onChange={handleTitleChange}
              label="Meta Title"
              type="text"
            />
            <TextField
              value={description}
              onChange={handleDescriptionChange}
              multiline={4}
              label={`${obj_type} meta description`}
              type="text"
            />
            <HorizontalStack gap={"3"}>
              {imageUrl && <Thumbnail source={imageUrl} />}
              <div style={{ flexGrow: 1 }}>
                <TextField
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  label="Image Url"
                  type="text"
                />
              </div>
            </HorizontalStack>
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
