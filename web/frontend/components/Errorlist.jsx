import { Grid, LegacyCard } from "@shopify/polaris";
import React from "react";

export function ErrorList() {
  return (
    <div className="seo_error_list_container">
      <div>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3, xl: 3 }}>
            <LegacyCard title="Total Errors For 404" sectioned>
              <p>10</p>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <LegacyCard title="Total Redirected" sectioned>
              <p>10</p>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <LegacyCard title="Total Error By Unique Users" sectioned>
              <p>10</p>
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <LegacyCard title="Total Redirected By Unique Users" sectioned>
              <p>10</p>
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </div>
    </div>
  );
}
