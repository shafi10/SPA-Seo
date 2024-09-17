import React from "react";
import { useUI } from "../contexts/ui.context";

export function ProductScan() {
  const { modal } = useUI();
  const product = modal?.data?.info;
  const metaTitle = product?.seo?.title;
  const metaDescription = product?.seo?.description;
  return (
    <div className="seo_scan_page">
      <div className="seo_scan_meta_info">
        <div className="seo_scan_product_section">
          <div className="seo_scan_product_meta">Meta Title</div>
          <div className="seo_scan_product_meta_data">
            <div className="seo_scan_product_title_suggestion">
              {metaTitle?.length == 0 && (
                <p style={{ color: "red" }}>Meta title Not Found</p>
              )}
              {metaTitle?.length < 50 && metaTitle?.length > 0 && (
                <p style={{ color: "red" }}>
                  Meta title is too short. Aim for at least 50 characters.
                </p>
              )}
              {metaTitle?.length > 60 && (
                <p style={{ color: "red" }}>
                  Meta title is too long. Try to keep it under 60 characters.
                </p>
              )}
              {!metaTitle
                ?.toLowerCase()
                ?.includes(product?.title?.toLowerCase()) && (
                <p style={{ color: "red" }}>
                  Consider including the product name for better SEO.
                </p>
              )}
            </div>
            <div>{product?.seo?.title}</div>
          </div>
        </div>
        <div className="seo_scan_product_section">
          <div className="seo_scan_product_meta">Meta Description</div>
          <div className="seo_scan_product_meta_data">
            <div className="seo_scan_product_title_suggestion">
              {metaDescription?.length == 0 && (
                <p style={{ color: "red" }}>Meta description Not Found</p>
              )}
              {metaDescription?.length < 50 && metaDescription?.length > 0 && (
                <p style={{ color: "red" }}>
                  Meta description is too short. Aim for at least 50 characters.
                </p>
              )}
              {metaDescription?.length > 160 && (
                <p style={{ color: "red" }}>
                  Meta description is too long. Try to keep it under 160
                  characters.
                </p>
              )}
              {!metaDescription
                ?.toLowerCase()
                ?.includes(product?.title?.toLowerCase()) && (
                <p style={{ color: "red" }}>
                  Consider including the product name for better SEO.
                </p>
              )}
              {!metaDescription?.toLowerCase().includes("buy") &&
                !metaDescription?.toLowerCase().includes("shop") && (
                  <p style={{ color: "red" }}>
                    Consider adding a call-to-action, such as 'Buy now' or 'Shop
                    today,' to improve engagement.
                  </p>
                )}
            </div>
            <div>{metaDescription}</div>
          </div>
        </div>
      </div>
      <div className="seo_scan_meta_info">Images</div>
    </div>
  );
}
