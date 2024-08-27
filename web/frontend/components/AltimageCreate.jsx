import React, { useEffect, useState } from "react";
import { Button, Form, FormLayout } from "@shopify/polaris";
// import { useState, useCallback } from "react";
// import { CreateProductSeo } from "./CreateProductSeo";
import { useUI } from "../contexts/ui.context";
import TextareaField from "./commonUI/TextareaField";

export function AltimageCreate() {
  const { modal } = useUI();
  const images = modal?.data?.info?.images?.edges?.map((data) => data?.node);
  console.log("🚀 ~ AltimageCreate ~ images:", images);

  const [formData, setFormData] = useState([]);

  const [errors, setErrors] = useState({
    image_alt: "",
  });

  const handleSubmit = (obj, image) => {
    if (!obj?.image_alt) {
      return setErrors({
        ...errors,
        image_alt: `Please enter image alt`,
      });
    }

    const info = {
      id: modal?.data?.info?.id,
      image_alt: obj.image_alt,
    };
    // createOrUpdateSeo(info);
  };

  const handleChange = (value, name, index) => {
    console.log("🚀 ~ handleChange ~ value:", value, index);
    const images = [...formData];
    const data = { ...images[index], altText: value };
    images[index] = data;
    setFormData(images);
    // setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    if (images.length > 0) {
      setFormData(images);
    }
  }, []);

  return (
    <div className="app__product_image_container">
      {formData?.map((image, index) => (
        <div className="app__product_alt_item">
          <div className="app__product_alt_image">
            <img src={image?.originalSrc} alt={image?.altText} />
          </div>
          <div className="app__product_alt_textarea">
            <Form
              className="app__product_alt_textarea"
              onSubmit={() => handleSubmit(formData, image)}
            >
              <div className="app__seo_alt_form">
                <div className="app__seo_alt_textarea">
                  <TextareaField
                    value={image?.altText}
                    onChange={handleChange}
                    label={"Enter image alt text"}
                    type="text"
                    name="seo_description"
                    placeholder="Enter image alt text"
                    error={errors?.seo_description}
                    index={index}
                  />
                </div>
                <div className="app_seo_alt_button">
                  <Button primary submit>
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      ))}
    </div>
  );
}
