import React, { useState } from "react";
import {
  IndexTable,
  Text,
  HorizontalStack,
  VerticalStack,
  Button,
  Form,
} from "@shopify/polaris";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { Spinners } from "./Spinner";
import { useUI } from "../contexts/ui.context";
import { InputField } from "./commonUI/InputField";
import TextareaField from "./commonUI/TextareaField";

export default function ProductBulkUpdate() {
  const { setOpenModal } = useUI();
  const { isError, isLoading, data } = useProductsQuery({
    url: "/api/product/list",
  });

  const [formData, setFormData] = useState([]);

  const handleSubmit = (obj) => {};

  const handleChange = (value, name) => {};

  const headings = [
    { title: "Image" },
    { title: "Name" },
    { title: "Meta title" },
    { title: "Meta Description" },
  ];

  return (
    <>
      {isLoading && !isError ? (
        <Spinners />
      ) : (
        <Form onSubmit={() => handleSubmit(formData)}>
          <div className="app_product_bulk_update">
            <div className="app_product_bulk_image">
              <div className="bold_title">Image</div>
              <div className="app_product_bulk_title bold_title">Name</div>
            </div>
            <div className="app_product_bulk_input bold_title">Meta title</div>
            <div className="product_bulk_update_description bold_title">
              Meta Description
            </div>
          </div>
          {data &&
            data?.map((info, index) => (
              <div position={index} className="app_product_bulk_update">
                <div className="app_product_bulk_image">
                  <img
                    src={info?.featuredImage?.url}
                    alt={info?.featuredImage?.altText}
                    className="app__feature_product_image"
                  />
                  <div className="app_product_bulk_title">{info?.title}</div>
                </div>
                <div className="app_product_bulk_input">
                  <InputField
                    value={info?.seo?.title}
                    onChange={handleChange}
                    type="text"
                    name="seo_title"
                    placeholder={"Enter Meta Title"}
                    error={""}
                  />
                </div>
                <div className="product_bulk_update_description">
                  <TextareaField
                    value={info?.seo?.description}
                    onChange={handleChange}
                    name="seo_description"
                    placeholder="Enter Meta Description"
                    error={""}
                  />
                </div>
              </div>
            ))}
        </Form>
      )}
    </>
  );
}
