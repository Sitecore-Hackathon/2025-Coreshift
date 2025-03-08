import { Search } from "sitecore-search-with-google-map";
import { Environment } from "@sitecore-search/react";

export default function Home() {
  const env = process.env.SEARCH_ENV as string;
  const customerKey = process.env.SEARCH_CUSTOMER_KEY;
  const searchApiKey = process.env.SEARCH_API_KEY;
  const discoverDomainId = process.env.SEARCH_DOMAIN_ID;
  const searchSource = process.env.SEARCH_SOURCE;
  const rfkId = process.env.SEARCH_RFK_ID;

  const imgUrl =
    "https://www.pngfind.com/pngs/m/5-58825_telephone-phone-icon-phone-symbol-png-yellow-transparent.png";

  return (
    <>
      <Search
        title="Sitecore Search with Google Maps Integration"
        discoverDomainId={discoverDomainId || ""}
        env={env as Environment}
        customerKey={customerKey || ""}
        apiKey={searchApiKey || ""}
        searchSource={searchSource || ""}
        rfkId={rfkId || ""}
        layout={"SearchWithInputOnTopWithParallelMapAndContent"}
        radiusInKM={20}
        description={
          "A custom Next.js package combining Sitecore Search with Google Maps for interactive, location-based search. Hosted on NPM and tested with a Next.js site on Vercel. refer this: https://www.npmjs.com/package/sitecore-search-with-google-map"
        }
        noResultFound="No result found"
        inputPlaceholder="Please search location here it will fetch place from google map and render data from sitecore search"
        mapIcon={imgUrl}
      />
    </>
  );
}
