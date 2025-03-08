
# Sitecore Search with Google Maps Integration

We’ve added a library on NPM designed to simplify Sitecore Search integration in Next.js applications when working with Google Maps. This library reduces the number of steps required for end users by streamlining the process and enhancing usability with Google Maps-based location searches.

## Features

* Easy integration of Google Maps with Sitecore Search in Next.js
* Location-based search using latitude, longitude, and customizable search radius
* Multiple layout options for flexible UI design
* Minimal configuration required for rapid development

## Installation

```
npm install sitecore-search-with-google-map
```

## Usage

Simply import the `<span>Search</span>` component and call it within your Next.js application:

```
import { Search } from "sitecore-search-with-google-map";

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
  description="A custom Next.js package combining Sitecore Search with Google Maps for interactive, location-based search. Hosted on NPM and tested with a Next.js site on Vercel. Refer here: https://www.npmjs.com/package/sitecore-search-with-google-map"
  noResultFound="No result found"
  inputPlaceholder="Please search location here; it will fetch places from Google Maps and render data from Sitecore Search."
  mapIcon={imgUrl}
/>
```

## How It Works

1. When a user searches for a location in the input field, the Google Maps API is called to fetch location suggestions.
2. Once a location is selected, Google Maps API is called again to retrieve latitude and longitude.
3. Sitecore Search API is called with the geolocation data and a configurable search radius.
4. Search results are displayed based on the proximity of the selected location.

### Example Query Configuration

```
const geoFilter = new FilterGeo("location", `${radiusInKM || 10}km`);
query
  .getRequest()
  .setSearchFacetAll(true)
  .setSources(searchSourceIds)
  .setSearchFilter(geoFilter);
```

## Props

| Prop                              | Type                    | Required | Description                                   |
| --------------------------------- | ----------------------- | -------- | --------------------------------------------- |
| `<span>title</span>`            | `<span>string</span>` | Yes      | Component title                               |
| `<span>description</span>`      | `<span>string</span>` | No       | Component description                         |
| `<span>inputPlaceholder</span>` | `<span>string</span>` | No       | Placeholder for the input field               |
| `<span>mapIcon</span>`          | `<span>string</span>` | No       | URL for the icon to display on the map        |
| `<span>noResultFound</span>`    | `<span>string</span>` | No       | Message when no results are found             |
| `<span>radiusInKM</span>`       | `<span>number</span>` | No       | Radius for location-based search (in km)      |
| `<span>rfkId</span>`            | `<span>string</span>` | Yes      | Sitecore Search RFK ID                        |
| `<span>searchSource</span>`     | `<span>string</span>` | Yes      | Sitecore Search source ID                     |
| `<span>apiKey</span>`           | `<span>string</span>` | Yes      | Sitecore Search API key                       |
| `<span>customerKey</span>`      | `<span>string</span>` | Yes      | Sitecore Search customer key                  |
| `<span>env</span>`              | `<span>string</span>` | Yes      | Sitecore Search environment                   |
| `<span>discoverDomainId</span>` | `<span>string</span>` | Yes      | Sitecore Search Discover Domain ID            |
| `<span>layout</span>`           | `<span>string</span>` | No       | Layout variation (see available values below) |

### Available Layouts

```
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

* Ensure the Google Maps API key has the proper permissions for Places API and Geocoding API.
* Confirm billing is enabled for the Google Cloud project.

### Sitecore Search API Key Issues

* Double-check the API key and customer key in your environment variables.
* Ensure search source and RFK ID are correctly set up in Sitecore Search.

## NPM Package

For more details, refer to the official package:
[https://www.npmjs.com/package/sitecore-search-with-google-map](https://www.npmjs.com/package/sitecore-search-with-google-map)
