Sitecore Search with Google Maps Integration

Introduction

sitecore-search-with-google-map is a custom Next.js package that simplifies the integration of Sitecore Search with Google Maps. This package enables users to search for locations using Google Maps, fetch latitude and longitude details, and then retrieve relevant data from Sitecore Search based on geolocation and radius filters.

Installation

npm install sitecore-search-with-google-map

Usage

Import the Search component and use it within your Next.js application:

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
description="A custom Next.js package combining Sitecore Search with Google Maps for interactive, location-based search. Hosted on NPM and tested with a Next.js site on Vercel."
noResultFound="No result found"
inputPlaceholder="Please search location here, it will fetch places from Google Maps and render data from Sitecore Search."
mapIcon={imgUrl}
/>

How It Works

When a user searches for a location in the input field, the Google Maps API is called to fetch location suggestions.

Once a location is selected, another Google Maps API call retrieves the latitude and longitude.

Sitecore Search API is then called with the geolocation data and a configurable search radius.

Example Query Configuration

const geoFilter = new FilterGeo("location", `${radiusInKM || 10}km`);
query
.getRequest()
.setSearchFacetAll(true)
.setSources(searchSourceIds)
.setSearchFilter(geoFilter);

Props

Prop

Type

Description

title

string

Component title

description

string

Component description

inputPlaceholder

string

Placeholder for the input field

mapIcon

string (URL)

Icon to display on the map

noResultFound

string

Message when no results are found

radiusInKM

number

Radius for location-based search (in km)

rfkId

string

Sitecore Search RFK ID

searchSource

string

Sitecore Search source ID

apiKey

string

Sitecore Search API key

customerKey

string

Sitecore Search customer key

env

string

Sitecore Search environment

discoverDomainId

string

Sitecore Search Discover Domain ID

layout

string

Layout variation (see available values below)

Available Layouts

layout?:
| "SearchWithInputOnTopWithParallelMapAndContent"
| "SearchWithInputMapContentStack"
| "SearchWithInputOnTopWithParallelMapAndContentSmallMap"
| "SearchWithParallelMapAndInputWithContent"
| "SearchWithInputOnTopWithParallelMapAndContentReverse"
| "SearchWithInputOnTopWithParallelMapAndContentSmallMapReverse"
| "SearchWithParallelMapAndInputWithContentReverse"
| undefined;

NPM Package

For more details, refer to the official package:
https://www.npmjs.com/package/sitecore-search-with-google-map
