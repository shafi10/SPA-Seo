import React, { useState } from "react";
import { FormLayout, Button, Form, InlineError } from "@shopify/polaris";
import { InputField } from "./commonUI/InputField";

export function AutoRedirect() {
  const [formData, setFormData] = useState({
    seo_title: "",
    seo_description: "",
  });

  const [errors, setErrors] = useState({
    seo_title: "",
    seo_description: "",
  });

  const handleSubmit = (obj) => {
    if (!obj?.seo_title) {
      return setErrors({
        ...errors,
        seo_title: `Please enter SEO title`,
      });
    } else if (obj?.seo_title?.length > 70) {
      return setErrors({
        ...errors,
        seo_title: `SEO title must be 70 characters or fewer. Currently, it is ${obj.seo_title.length} characters.`,
      });
    } else if (!obj?.seo_description) {
      return setErrors({
        ...errors,
        seo_description: `Please enter SEO description`,
      });
    } else if (obj?.seo_description?.length > 160) {
      return setErrors({
        ...errors,
        seo_description: `SEO description must be 160 characters or fewer. Currently, it is ${obj.seo_description.length} characters.`,
      });
    }

    const info = {
      id: modal?.data?.info?.id,
      seoTitle: obj?.seo_title,
      seoDescription: obj?.seo_description,
    };
    createOrUpdateSeo(info);
  };

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="seo_auto_redirect_page">
      <div className="seo_auto_redirect_form_container">
        <Form onSubmit={() => handleSubmit(formData)}>
          <div className="seo_auto_redirect_form">
            <InputField
              value={formData?.seo_title}
              onChange={handleChange}
              label={"Enter path"}
              type="text"
              name="seo_title"
              placeholder={"Enter path"}
              error={errors?.seo_title}
            />
            <InputField
              value={formData?.seo_title}
              onChange={handleChange}
              label={"Enter target"}
              type="text"
              name="seo_title"
              placeholder={"Enter target"}
              error={errors?.seo_title}
            />
            <div className="seo_auto_redirect_button">
              <Button primary submit>
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className="seo_auto_redirect_list_container">
        <div className="seo_auto_redirect_list_title">Redirect List</div>
      </div>
    </div>
  );
}
