import React, { useEffect, useState } from "react";
import { Button, Form } from "@shopify/polaris";
import { useUI } from "../contexts/ui.context";
import TextareaField from "./commonUI/TextareaField";
import {
  useSingleArticleQuery,
  useUpdateArticleSeoImgAlt,
} from "../hooks/useBlogsQuery";
import { Spinners } from "./Spinner";

export function ArticleAltTextImage() {
  const { modal, setToggleToast } = useUI();
  const { data, isLoading } = useSingleArticleQuery({
    url: `/api/blog/articleById/${modal?.data?.info?.blog_id}/${modal?.data?.info?.id}`,
  });
  const image = data?.image;
  const { mutate: updateSeoAltText, isError } = useUpdateArticleSeoImgAlt();
  const [formData, setFormData] = useState("");

  const handleSubmit = (input) => {
    if (!input) {
      return setToggleToast({
        active: true,
        message: `Alt text cannot be empty`,
      });
    }

    const info = {
      id: modal?.data?.info?.id,
      blogId: modal?.data?.info?.blog_id,
      image: {
        ...image,
        alt: input,
      },
    };
    updateSeoAltText(info);
  };

  const handleChange = (value) => {
    setFormData(value);
  };

  useEffect(() => {
    if (image?.src) {
      setFormData(image?.alt);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Spinners />
      ) : (
        <div className="app__product_image_container">
          {image?.src ? (
            <div className="app__product_alt_item">
              <div className="app__product_alt_image">
                <img src={image?.src} alt={image?.alt} />
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
                        rows={2}
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
      )}
    </>
  );
}
