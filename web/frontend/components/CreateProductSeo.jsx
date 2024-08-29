import React, { useEffect, useState } from "react";
import { FormLayout, Button, Form, InlineError } from "@shopify/polaris";
import { InputField } from "./commonUI/InputField";
import {
  useCreateProductSeo,
  // useProductsQueryByID,
} from "../hooks/useProductsQuery";
import { useUI } from "../contexts/ui.context";
// import { useNavigate } from "react-router-dom";
import TextareaField from "./commonUI/TextareaField";

export function CreateProductSeo() {
  const { modal } = useUI();
  const { mutate: createOrUpdateSeo, isError } = useCreateProductSeo();
  // const { isLoading, data } = useProductsQueryByID({
  //   url: `/api/product/${modal?.data?.info?.id}`,
  //   id: modal?.data?.info?.id,
  // });
  // console.log("🚀 ~ CreateProductSeo ~ data:", data);
  // console.log("🚀 ~ CreateProductSeo ~ data:", modal?.data?.info);
  // const navigate = useNavigate();

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

    // if (modal?.data?.isEdit) {
    //   let newList = [...modal?.data?.attachmentList];
    //   newList[modal?.data?.index] = obj;
    //   const info = {
    //     id: modal?.data?.info?.id,
    //     isEdit: true,
    //     attachmentList: newList,
    //   };
    //   createProductAttachment(info);
    // } else {
    const info = {
      id: modal?.data?.info?.id,
      seoTitle: obj.seo_title,
      seoDescription: obj?.seo_description,
    };
    createOrUpdateSeo(info);
    // }
  };

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    if (modal?.data?.info?.seo?.title && modal?.data?.info?.seo?.description) {
      setFormData({
        ...formData,
        seo_title: modal?.data?.info?.seo?.title,
        seo_description: modal?.data?.info?.seo?.description,
      });
    }
  }, [modal?.data?.info?.seo?.title, modal?.data?.info?.seo?.description]);

  return (
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
          />
          <Button primary submit>
            Submit
          </Button>
        </FormLayout>
      </Form>
    </>
  );
}
