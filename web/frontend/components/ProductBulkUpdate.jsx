import React, { useEffect, useState } from "react";
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
import Pagination from "./commonUI/Pagination";

export default function ProductBulkUpdate() {
  const { setOpenModal } = useUI();
  const { isError, isLoading, data } = useProductsQuery({
    url: "/api/product/list",
  });

  const [formData, setFormData] = useState([]);

  const handleSubmit = (obj) => {};

  const handleChange = (value, name) => {
    const products = [...formData];
    const product = products[index];
    const data = {
      ...product,
      seo: {
        ...product?.seo,
        title: name === "seo_title" ? value : product?.seo?.title,
        description:
          name === "seo_description" ? value : product?.seo?.description,
      },
    };
    products[index] = data;
    setFormData(products);
  };

  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const currentPageData = formData.slice(startIndex, endIndex);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  return (
    <>
      {isLoading && !isError ? (
        <Spinners />
      ) : (
        <div className="app_product_bulk_update_container">
          <div className="app_product_bulk_update_button">
            <Button primary submit>
              Submit
            </Button>
          </div>
          <Form onSubmit={() => handleSubmit(formData)}>
            <div className="app_product_bulk_update">
              <div className="app_product_bulk_image">
                <div className="bold_title">Image</div>
                <div className="app_product_bulk_title bold_title">Name</div>
              </div>
              <div className="app_product_bulk_input bold_title">
                Meta title
              </div>
              <div className="product_bulk_update_description bold_title">
                Meta Description
              </div>
            </div>
            {currentPageData?.map((info, index) => (
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
          {data?.length > 10 && (
            <div className="center__align content__margin_top">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                itemList={data}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
