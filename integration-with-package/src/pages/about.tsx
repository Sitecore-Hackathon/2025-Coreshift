import { Search } from "sitecore-search-with-google-map";
import { Environment } from "@sitecore-search/react";

export default function Home() {
  const env = process.env.SEARCH_ENV as string;
  const customerKey = process.env.SEARCH_CUSTOMER_KEY;
  const searchApiKey = process.env.SEARCH_API_KEY;
  const discoverDomainId = process.env.SEARCH_DOMAIN_ID;
  const searchSource = process.env.SEARCH_SOURCE1;
  const rfkId = process.env.SEARCH_RFK_ID;

  const imgUrl =
    "https://www.pngfind.com/pngs/m/5-58825_telephone-phone-icon-phone-symbol-png-yellow-transparent.png";
  const customArticleRenderer = (article: any) => (
    <div className="bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 p-6 rounded-2xl shadow-lg text-gray-800">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">{article.title}</h2>
      </div>
      <span className="inline-block bg-purple-400 text-white text-sm font-medium px-3 mt-1 py-1 rounded-full shadow-sm">
        {article?.category?.[0]}
      </span>

      <p className="mt-3 text-base text-gray-700">{article.description}</p>

      <a
        href={article?.url}
        className="mt-4 inline-block bg-purple-600 text-white font-medium py-2 px-6 rounded-xl transition-transform transform hover:scale-105 hover:bg-blue-600"
      >
        Learn More
      </a>

      {/* <input
        type="text"
        placeholder="Share your thoughts..."
        className="mt-6 w-full p-3 rounded-xl text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
      /> */}
    </div>
  );

  return (
    <div className="about-search">
      <Search
        title="Sitecore Search with Google Maps Integration"
        discoverDomainId={discoverDomainId || ""}
        env={env as Environment}
        customerKey={customerKey || ""}
        apiKey={searchApiKey || ""}
        searchSource={searchSource || ""}
        rfkId={rfkId || ""}
        radiusInKM={50}
        layout={"SearchWithParallelMapAndInputWithContentReverse"}
        description={
          "A custom Next.js package combining Sitecore Search with Google Maps for interactive, location-based search. Hosted on NPM and tested with a Next.js site on Vercel. refer this: https://www.npmjs.com/package/sitecore-search-with-google-map"
        }
        noResultFound="No result found"
        inputPlaceholder="Please search location here it will fetch place from google map and render data from sitecore search"
        customArticleRenderer={customArticleRenderer}
        mapIcon={imgUrl}
      />
    </div>
  );
}
