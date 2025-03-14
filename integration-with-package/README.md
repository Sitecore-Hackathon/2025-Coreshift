# Sitecore Search with Google Maps Integration

This guide explains how to integrate the `sitecore-search-with-google-map` package into your Next.js application. This package simplifies the process of combining Sitecore Search with Google Maps for an enhanced location-based search experience.

**Vercel** :
https://integration-with-package.vercel.app/
https://integration-with-package.vercel.app/about

## Installation

First, install the package using npm:

```sh
npm install sitecore-search-with-google-map
```

## Tailwind CSS Configuration

To ensure the package's styles are applied correctly, update your `tailwind.config.ts` file by adding the following content paths:

```ts
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/sitecore-search-with-google-map/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/sitecore-search-with-google-map/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
```

## Usage

vercel urls:
[https://integration-with-package-jvfarjqg3.vercel.app/about](https://integration-with-package-jvfarjqg3.vercel.app/about)
[https://integration-with-package-jvfarjqg3.vercel.app](https://integration-with-package-jvfarjqg3.vercel.app/)

Import the `Search` component and integrate it into your Next.js application: in repository, you can check home and about page.

```tsx
import { Search } from "sitecore-search-with-google-map";
const customArticleRenderer = (article: any) => (
    <div className="bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 p-6 rounded-2xl shadow-lg text-gray-800">
        <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">{article.title}</h2>
        </div>
        <span className="inline-block bg-purple-400 text-white text-sm font-medium px-3 mt-1 py-1 rounded-full shadow-sm">
            {article?.category?.[0]}
        </span>
        <p className="mt-3 text-base text-gray-700">
            {article.description}
        </p>
        <a
            href={article?.url}
            className="mt-4 inline-block bg-purple-600 text-white font-medium py-2 px-6 rounded-xl transition-transform transform hover:scale-105 hover:bg-blue-600"
        >
            Learn More
        </a>
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
                "A custom Next.js package combining Sitecore Search with Google Maps for interactive, location-based search. Hosted on NPM and tested with a Next.js site on Vercel. Refer this: https://www.npmjs.com/package/sitecore-search-with-google-map"
            }
            noResultFound="No result found"
            inputPlaceholder="Please search location here it will fetch place from google map and render data from sitecore search"
            customArticleRenderer={customArticleRenderer}
            mapIcon={imgUrl}
        />
    </div>
);
```

If you do not pass the `customArticleRenderer`, the default article renderer will be used.

## How It Works

1. Users search for a location using the input field.
2. The Google Maps API fetches location suggestions.
3. Upon selection, Google Maps API retrieves latitude and longitude.
4. The Sitecore Search API is called with the geolocation data and search radius.
5. Results are displayed based on proximity to the selected location.

## Example Query Configuration

```ts
const geoFilter = new FilterGeo("location", `${radiusInKM || 10}km`);
query
  .getRequest()
  .setSearchFacetAll(true)
  .setSources(searchSourceIds)
  .setSearchFilter(geoFilter);
```

## Props

| Prop                      | Type         | Required | Description                          |
| ------------------------- | ------------ | -------- | ------------------------------------ |
| `title`                 | `string`   | Yes      | Component title                      |
| `description`           | `string`   | No       | Component description                |
| `inputPlaceholder`      | `string`   | No       | Placeholder for the input field      |
| `mapIcon`               | `string`   | No       | URL for the map icon                 |
| `noResultFound`         | `string`   | No       | Message when no results are found    |
| `radiusInKM`            | `number`   | No       | Search radius in km                  |
| `rfkId`                 | `string`   | Yes      | Sitecore Search RFK ID               |
| `searchSource`          | `string`   | Yes      | Sitecore Search source ID            |
| `apiKey`                | `string`   | Yes      | Sitecore Search API key              |
| `customerKey`           | `string`   | Yes      | Sitecore Search customer key         |
| `env`                   | `string`   | Yes      | Sitecore Search environment          |
| `discoverDomainId`      | `string`   | Yes      | Sitecore Search Discover Domain ID   |
| `layout`                | `string`   | No       | Layout variation (see options below) |
| `customArticleRenderer` | `Function` | No       | Custom renderer for articles         |

## Available Layouts

```ts
layout?:
  | "SearchWithInputOnTopWithParallelMapAndContent"
  | "SearchWithInputMapContentStack"
  | "SearchWithInputOnTopWithParallelMapAndContentSmallMap"
  | "SearchWithParallelMapAndInputWithContent"
  | "SearchWithInputOnTopWithParallelMapAndContentReverse"
  | "SearchWithInputOnTopWithParallelMapAndContentSmallMapReverse"
  | "SearchWithParallelMapAndInputWithContentReverse"
  | undefined;
```

## Troubleshooting

### Google Maps API Key Issues

* Ensure the API key has permissions for Places API and Geocoding API.
* Confirm billing is enabled in Google Cloud.

### Sitecore Search API Key Issues

* Verify the API key and customer key.
* Ensure search source and RFK ID are correctly set in Sitecore Search.
* Check if the Sitecore Search instance is properly configured.

### Styling Issues

* Ensure Tailwind CSS is properly configured to include the package in the `content` paths.
* Restart your Next.js application after making changes to the `tailwind.config.ts` file.
  This documentation provides a complete guide to integrating `sitecore-search-with-google-map` into your Next.js application. Happy coding!
