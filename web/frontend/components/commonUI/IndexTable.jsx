import { IndexTable, LegacyCard, Pagination } from "@shopify/polaris";
import React, { useState } from "react";

export function IndexTableData({
  rowMarkup,
  headings,
  resourceName,
  itemsPerPage = 30,
}) {
  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const currentPageData = rowMarkup.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(rowMarkup.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={rowMarkup?.length}
          selectable={false}
          headings={headings}
        >
          {currentPageData}
        </IndexTable>
      </LegacyCard>
      {rowMarkup?.length > 10 && (
        <div className="center__align content__margin_top">
          <Pagination
            hasPrevious={currentPage > 1}
            onPrevious={handlePrevious}
            hasNext={currentPage < Math.ceil(rowMarkup.length / itemsPerPage)}
            onNext={handleNext}
          />
        </div>
      )}
    </>
  );
}
