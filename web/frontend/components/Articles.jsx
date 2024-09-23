import React from "react";
import {
  IndexTable,
  Text,
  HorizontalStack,
  VerticalStack,
  Button,
} from "@shopify/polaris";
import { IndexTableData } from "./commonUI/IndexTable";
import { Spinners } from "./Spinner";
import { useUI } from "../contexts/ui.context";
import { useArticlesQuery } from "../hooks/useBlogsQuery";

export default function ArticlesPage() {
  const { setOpenModal, modal } = useUI();
  const { isError, isLoading, data } = useArticlesQuery({
    url: `/api/blog/articles/${modal?.data?.info?.id}`,
  });

  const rowMarkup =
    (data &&
      data?.map((info, index) => (
        <IndexTable.Row id={info?.id} key={info?.id} position={index}>
          <IndexTable.Cell>
            <Text as="span">{info?.title}</Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span">{info?.tags}</Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span">{info?.author}</Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <HorizontalStack gap="4" align="center">
              <Button
                className="cursor_pointer"
                primary
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal({
                    view: "ARTICLE_SEO",
                    isOpen: true,
                    data: {
                      title: `Article SEO (${info?.title})`,
                      info: info,
                    },
                  });
                }}
              >
                SEO
              </Button>
            </HorizontalStack>
          </IndexTable.Cell>
        </IndexTable.Row>
      ))) ||
    [];

  const headings = [
    { title: "Name" },
    { title: "Tags" },
    { title: "Author" },
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
        <VerticalStack gap="2">
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
