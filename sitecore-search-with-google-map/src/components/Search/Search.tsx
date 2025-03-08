import {
  Environment,
  PageController,
  WidgetsProvider,
} from "@sitecore-search/react";
import SearchResultsWidget from "../SearchResults";

const context = PageController.getContext();

context.setLocaleLanguage("en");
context.setLocaleCountry("us");
const Search = ({
  discoverDomainId,
  env,
  customerKey,
  apiKey,
  searchSource,
  rfkId,
  ...props
}: {
  discoverDomainId: string;
  env: Environment;
  customerKey: string;
  apiKey: string;
  searchSource?: string;
  rfkId: string;
  title?: string;
  noResultFound?: string;
  description?: string;
  inputPlaceholder?: string;
  mapIcon?: string;
  radiusInKM?: number;
  customArticleRenderer?: (article: any) => JSX.Element;
  layout?:
    | "SearchWithInputOnTopWithParallelMapAndContent"
    | "SearchWithInputMapContentStack"
    | "SearchWithInputOnTopWithParallelMapAndContentSmallMap"
    | "SearchWithParallelMapAndInputWithContent"
    | "SearchWithInputOnTopWithParallelMapAndContentReverse"
    | "SearchWithInputOnTopWithParallelMapAndContentSmallMapReverse"
    | "SearchWithParallelMapAndInputWithContentReverse"
    | undefined;
}) => {
  return (
    <>
      <WidgetsProvider
        discoverDomainId={discoverDomainId}
        env={env as Environment}
        customerKey={customerKey}
        apiKey={apiKey}
      >
        <SearchResultsWidget
          searchSource={searchSource || ""}
          rfkId={rfkId}
          {...props}
        />
      </WidgetsProvider>
    </>
  );
};

export default Search;
