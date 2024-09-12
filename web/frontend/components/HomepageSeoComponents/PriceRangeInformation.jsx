import React, { useCallback, useState } from "react";
import {
  Layout,
  Box,
  Text,
  AlphaCard,
  VerticalStack,
  TextField,
  RangeSlider,
  LegacyStack,
} from "@shopify/polaris";

export default function PriceRangeInformation() {
  const initialValue = [500, 1500];
  const prefix = "$";
  const min = 0;
  const max = 2000;
  const step = 100;

  const [intermediateTextFieldValue, setIntermediateTextFieldValue] =
    useState(initialValue);
  const [rangeValue, setRangeValue] = useState(initialValue);

  const handleRangeSliderChange = useCallback((value) => {
    setRangeValue(value);
    setIntermediateTextFieldValue(value);
  }, []);

  const handleLowerTextFieldChange = useCallback(
    (value) => {
      const upperValue = rangeValue[1];
      setIntermediateTextFieldValue([parseInt(value, 10), upperValue]);
    },
    [rangeValue]
  );

  const handleUpperTextFieldChange = useCallback(
    (value) => {
      const lowerValue = rangeValue[0];
      setIntermediateTextFieldValue([lowerValue, parseInt(value, 10)]);
    },
    [rangeValue]
  );

  const handleLowerTextFieldBlur = useCallback(() => {
    const upperValue = rangeValue[1];
    const value = intermediateTextFieldValue[0];

    setRangeValue([value, upperValue]);
  }, [intermediateTextFieldValue, rangeValue]);

  const handleUpperTextFieldBlur = useCallback(() => {
    const lowerValue = rangeValue[0];
    const value = intermediateTextFieldValue[1];

    setRangeValue([lowerValue, value]);
  }, [intermediateTextFieldValue, rangeValue]);

  const handleEnterKeyPress = useCallback(
    (event) => {
      const newValue = intermediateTextFieldValue;
      const oldValue = rangeValue;

      if (event.key === "Enter" && newValue !== oldValue) {
        setRangeValue(newValue);
      }
    },
    [intermediateTextFieldValue, rangeValue]
  );

  const lowerTextFieldValue =
    intermediateTextFieldValue[0] === rangeValue[0]
      ? rangeValue[0]
      : intermediateTextFieldValue[0];

  const upperTextFieldValue =
    intermediateTextFieldValue[1] === rangeValue[1]
      ? rangeValue[1]
      : intermediateTextFieldValue[1];

  return (
    <Box paddingBlockStart={"6"} paddingBlockEnd={"5"}>
      <Layout>
        <Layout.Section oneThird>
          <Box paddingBlockEnd={"4"}>
            <Text variant="headingMd">Price Range</Text>
          </Box>
          <Box>
            <Text variant="bodyMd">
              Get better search placement by letting Google know the price range
              for your store.
            </Text>
          </Box>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Box>
            <AlphaCard>
              <VerticalStack gap={"4"}>
                <Text variant="headingSm">Price range for your store:</Text>
                <div onKeyDown={handleEnterKeyPress}>
                  <RangeSlider
                    output
                    value={rangeValue}
                    prefix={prefix}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleRangeSliderChange}
                  />
                  <LegacyStack distribution="equalSpacing" spacing="extraLoose">
                    <TextField
                      label="Min"
                      type="number"
                      value={`${lowerTextFieldValue}`}
                      prefix={prefix}
                      min={min}
                      max={max}
                      step={step}
                      onChange={handleLowerTextFieldChange}
                      onBlur={handleLowerTextFieldBlur}
                      autoComplete="off"
                    />
                    <TextField
                      label="Max"
                      type="number"
                      value={`${upperTextFieldValue}`}
                      prefix={prefix}
                      min={min}
                      max={max}
                      step={step}
                      onChange={handleUpperTextFieldChange}
                      onBlur={handleUpperTextFieldBlur}
                      autoComplete="off"
                    />
                  </LegacyStack>
                </div>
              </VerticalStack>
            </AlphaCard>
          </Box>
        </Layout.Section>
      </Layout>
    </Box>
  );
}
