import React, { useEffect, useState } from "react";
import { FormLayout, Button, Form, InlineError } from "@shopify/polaris";
import { InputField } from "./commonUI/InputField";
import { useUI } from "../contexts/ui.context";
import TextareaField from "./commonUI/TextareaField";
import { useArticlesSeoQuery, useUpdateBlogSeo } from "../hooks/useBlogsQuery";
import { Spinners } from "./Spinner";

export function CreateArticleSeo() {
  const { modal } = useUI();
  const { data, isLoading } = useArticlesSeoQuery({
    url: `/api/blog/article-seo/${modal?.data?.info?.id}`,
  });
  const { mutate: createOrUpdateSeo, isError } = useUpdateBlogSeo();
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
    } else if (!obj?.seo_description) {
      return setErrors({
        ...errors,
        seo_description: `Please enter SEO description`,
      });
    }

    const info = {
      seoObj: {
        id: modal?.data?.info?.id,
        seoTitle: obj.seo_title,
        seoDescription: obj?.seo_description,
      },
    };
    createOrUpdateSeo(info);
  };

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    if (
      (data?.seoDescription || data?.seoTitle) &&
      modal?.data?.info?.id === data?.id
    ) {
      setFormData({
        ...formData,
        seo_title: data?.seoTitle,
        seo_description: data?.seoDescription,
      });
    }
  }, [data?.seoTitle, data?.seoDescription]);

  return (
    <>
      {isLoading ? (
        <Spinners />
      ) : (
        <>
          {isError && <InlineError message={"Something went wrong"} />}
          <Form onSubmit={() => handleSubmit(formData)}>
            <FormLayout>
              <InputField
                value={formData?.seo_title}
                onChange={handleChange}
                label={"Enter Meta Title"}
                type="text"
                name="seo_title"
                placeholder={"Enter Meta Title"}
                error={errors?.seo_title}
              />
              <TextareaField
                value={formData?.seo_description}
                onChange={handleChange}
                label={"Enter Meta Description"}
                type="text"
                name="seo_description"
                placeholder="Enter Meta Description"
                error={errors?.seo_description}
                rows={"5"}
              />
              <Button primary submit>
                Submit
              </Button>
            </FormLayout>
          </Form>
        </>
      )}
    </>
  );
}
