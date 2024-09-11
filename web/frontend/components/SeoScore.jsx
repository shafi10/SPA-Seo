import React, { useEffect, useState } from "react";
import { useUI } from "../contexts/ui.context";
import { Spinners } from "./Spinner";

export function PageSpeedInsights() {
  const { modal, shop } = useUI();
  const url = `https://${shop?.domain}`;
  const [seoScore, setSeoScore] = useState(null);
  console.log("🚀 ~ SeoScore ~ url:", url);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apikey = "AIzaSyAEu1z7QmLwZBGCvyoU6n3Nin8iTfqan-A";

  const getSeoScore = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&category=SEO&key=${apikey}`
      );
      const result = await response.json();
      console.log("🚀 ~ getSeoScore ~ result:", result);

      const seoScore = result.lighthouseResult.categories.seo.score * 100;
      setSeoScore(seoScore);
    } catch (error) {
      setError(
        "Failed to fetch SEO score. Please check the URL and try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSeoScore();
  }, []);

  return (
    <div className="app__seo_score_container">
      {isLoading ? (
        <Spinners />
      ) : (
        <>
          <div className="seo_score_page_title_container">
            <div className="seo_score_page_title">Page Speed Insights</div>
            <p className="seo_score_page_description">
              PageSpeed Insights is a powerful tool designed to optimize website
              performance, providing a detailed assessment of your site based on
              Google's key evaluation criteria
            </p>
          </div>
          <div className="seo_score_container_grid">
            <div className="seo_score_container">
              <div className="seo_score_title">Lighthouse SEO performance</div>
              <div
                style={{
                  backgroundColor:
                    seoScore >= 90 ? "#0c6" : seoScore >= 50 ? "#fa3" : "#f33",
                }}
                className="seo_score_result_container"
              >
                <div className="seo_score_result">{seoScore}</div>
              </div>
            </div>
            <div className="seo_score_container">
              <div className="seo_score_title">Lighthouse SEO performance</div>
              <div
                style={{
                  backgroundColor:
                    seoScore >= 90 ? "#0c6" : seoScore >= 50 ? "#fa3" : "#f33",
                }}
                className="seo_score_result_container"
              >
                <div className="seo_score_result">{seoScore}</div>
              </div>
            </div>
            <div className="seo_score_container">
              <div className="seo_score_title">Lighthouse SEO performance</div>
              <div
                style={{
                  backgroundColor:
                    seoScore >= 90 ? "#0c6" : seoScore >= 50 ? "#fa3" : "#f33",
                }}
                className="seo_score_result_container"
              >
                <div className="seo_score_result">{seoScore}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
