import Search from "@/components/Search/Search";
import { Environment } from "@sitecore-search/react";

export default function Home() {
  const env = process.env.SEARCH_ENV as string;
  const customerKey = process.env.SEARCH_CUSTOMER_KEY;
  const searchApiKey = process.env.SEARCH_API_KEY;
  const discoverDomainId = process.env.SEARCH_DOMAIN_ID;
  const searchSource = process.env.SEARCH_SOURCE;
  const rfkId = process.env.SEARCH_RFK_ID;

  const customArticleRenderer = (article: any) => (
    <div>
      <h2 className="articleTitle text-2xl text-red-600 font-semibold ">
        {article.name} Krushna
      </h2>
      <p className="text-gray-600 mt-2">{article.description}</p>

      <a
        href={article?.url}
        className="mt-4 block w-fit  bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600"
      >
        Learn More
      </a>
    </div>
  );

  return (
    <Search
      title="Sitecore Search With Google Map"
      discoverDomainId={discoverDomainId || ""}
      env={env as Environment}
      customerKey={customerKey || ""}
      apiKey={searchApiKey || ""}
      searchSource={searchSource || ""}
      rfkId={rfkId || ""}
      layout={"SearchWithInputOnTopWithParallelMapAndContentReverse"}
      description={"hello"}
      noResultFound="No result found"
      inputPlaceholder="placeHolder"
      radiusInKM={20}
      // customArticleRenderer={customArticleRenderer}
      mapIcon="https://img.icons8.com/?size=512&id=63257&format=png"
    />
  );
}
