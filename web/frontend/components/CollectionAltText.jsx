import React, { useEffect, useState } from "react";
import { Button, Form } from "@shopify/polaris";
import { useUI } from "../contexts/ui.context";
import TextareaField from "./commonUI/TextareaField";
import { useUpdateCollectionSeoImgAlt } from "../hooks/useCollectionsQuery";

export function CollectionAltTextImage() {
  const { modal, setToggleToast } = useUI();
  const image = modal?.data?.info?.image;

  const { mutate: updateSeoAltText, isError } = useUpdateCollectionSeoImgAlt();
  const [formData, setFormData] = useState([]);

  const handleSubmit = (obj) => {
    if (!obj) {
      return setToggleToast({
        active: true,
        message: `Alt text cannot be empty`,
      });
    }

    const info = {
      id: modal?.data?.info?.id,
      imageId: image?.id,
      atlText: obj,
    };
    updateSeoAltText(info);
  };

  const handleChange = (value) => {
    setFormData(value);
  };

  useEffect(() => {
    if (image?.url) {
      setFormData(image?.altText);
    }
  }, []);

  return (
    <div className="app__product_image_container">
      {image?.url ? (
        <div className="app__product_alt_item">
          <div className="app__product_alt_image">
            <img src={image?.url} alt={image?.altText} />
          </div>
          <div className="app__product_alt_textarea">
            <Form
              className="app__product_alt_textarea"
              onSubmit={() => handleSubmit(formData)}
            >
              <div className="app__seo_alt_form">
                <div className="app__seo_alt_textarea">
                  <TextareaField
                    value={formData}
                    onChange={handleChange}
                    label={"Enter image alt text"}
                    type="text"
                    name="altText"
                    placeholder="Enter image alt text"
                    error={""}
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
      ) : (
        <div>Image not available </div>
      )}
    </div>
  );
}
