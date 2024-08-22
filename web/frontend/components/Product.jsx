import React from "react";
import {
  IndexTable,
  Text,
  HorizontalStack,
  VerticalStack,
  Button,
} from "@shopify/polaris";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { IndexTableData } from "./commonUI/IndexTable";
import { Spinners } from "./Spinner";
import { useUI } from "../contexts/ui.context";

export default function Product() {
  const { setOpenModal } = useUI();
  const { isError, isLoading, data } = useProductsQuery({
    url: "/api/product/list",
  });

  console.log("🚀 ~ Product ~ data:", data);
  const rowMarkup =
    (data &&
      data?.map((info, index) => (
        <IndexTable.Row id={info?.id} key={info?.id} position={index}>
          <IndexTable.Cell>
            <img
              src={info?.featuredImage?.url}
              alt={info?.featuredImage?.altText}
              className="app__feature_product_image"
            />
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span">{info?.title}</Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span">{info?.status}</Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <HorizontalStack gap="4" align="center">
              <Button
                className="cursor_pointer"
                primary
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal({
                    view: "CREATE_PRODUCT_SEO",
                    isOpen: true,
                    data: {
                      title: "Product SEO",
                      info: info,
                    },
                  });
                }}
              >
                Update SEO
              </Button>
            </HorizontalStack>
          </IndexTable.Cell>
        </IndexTable.Row>
      ))) ||
    [];

  const headings = [
    { title: "Image" },
    { title: "Name" },
    { title: "Status" },
    { title: "Action", alignment: "center" },
  ];

  const resourceName = {
    singular: "Product",
    plural: "Products",
  };
  return (
    <>
      {isLoading && !isError ? (
        <Spinners />
      ) : (
        <VerticalStack gap="4">
          <IndexTableData
            isLoading={isLoading}
            rowMarkup={rowMarkup}
            headings={headings}
            resourceName={resourceName}
          />
        </VerticalStack>
      )}
    </>
  );
}
