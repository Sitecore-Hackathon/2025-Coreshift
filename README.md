![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")

# Sitecore Hackathon 2025

- MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
- [Entry form template](ENTRYFORM.md)

# Hackathon Submission Entry form

> __Important__
>
> Copy and paste the content of this file into README.md or face automatic __disqualification__
> All headlines and subheadlines shall be retained if not noted otherwise.
> Fill in text in each section as instructed and then delete the existing text, including this blockquote.

You can find a very good reference to Github flavoured markdown reference in [this cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). If you want something a bit more WYSIWYG for editing then could use [StackEdit](https://stackedit.io/app) which provides a more user friendly interface for generating the Markdown code. Those of you who are [VS Code fans](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview) can edit/preview directly in that interface too.

## Team name

⟹ CoreShift

## Category

⟹ Integration

## Description

⟹ Write a clear description of your hackathon entry.

- Module Purpose

  - The `sitecore-search-with-google-map` package simplifies the integration of Sitecore Search with Google Maps in Next.js applications. It enables users to perform location-based searches effortlessly by leveraging Google Maps API for geolocation data and Sitecore Search for content discovery.
- What problem was solved (if any)

  - Before this module, integrating Sitecore Search with Google Maps required multiple API calls, complex configurations, and manual data handling. This package eliminates those complexities by providing a streamlined, ready-to-use component that:

  * Reduces development effort by offering an easy-to-use search interface
  * Provides customizable search layouts
  * Automates the fetching and filtering of location-based search results

_You can alternately paste a [link here](#docs) to a document within this repo containing the description._

## Video link

⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Hackathon_2025_Demo](https://horizontal-my.sharepoint.com/:v:/p/abarve/ER8SZgX2vCtOkfaP6Mi86wQBEXD2xAs2sqBq7jh5fAvqXA?e=c5iGCy)

## Pre-requisites and Dependencies

⟹ Does your module rely on other Sitecore modules or frameworks?

- Required Dependencies
  - **Next.js** (Recommended version: 13 or later)
  - **Sitecore Search API**
  - **Google Maps API** (Places API & Geocoding API enabled)

###   Sitecore Dependencies

* A valid Sitecore Search account
* Configured search source and RFK ID in Sitecore Search

_Remove this subsection if your entry does not have any prerequisites other than Sitecore_

## Installation instructions

### 1. Install the Package

Run the following command to install the package via npm:

```
npm install sitecore-search-with-google-map
```

### 2. Configure Tailwind CSS (If Applicable)

To ensure proper styling, update your `<span>tailwind.config.ts</span>` file by adding the package’s content paths:

```
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

### 3. Add the Component to Your Next.js Application

Import the `<span>Search</span>` component and use it within your app:

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
  radiusInKM={20}
  layout={"SearchWithInputOnTopWithParallelMapAndContent"}
  description="A Next.js package integrating Sitecore Search with Google Maps for location-based searches."
  noResultFound="No result found"
  inputPlaceholder="Search for a location here..."
  mapIcon={imgUrl}
/>
```

### 4. Set Up Google Maps API

Ensure you have a valid Google Maps API key with the following services enabled:

* **Places API**
* **Geocoding API**

### 5. Configure Sitecore Search

* Obtain your **API key**, **customer key**, **search source**, and **RFK ID** from your Sitecore Search account.
* Ensure that the search source has location-based filtering enabled.

### Configuration

⟹ If there are any custom configuration that has to be set manually then remember to add all details here.

_Remove this subsection if your entry does not require any configuration that is not fully covered in the installation instructions already_

## Usage instructions

⟹ Provide documentation about your module, how do the users use your module, where are things located, what do the icons mean, are there any secret shortcuts etc.

Include screenshots where necessary. You can add images to the `./images` folder and then link to them from your documentation:

![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")

You can embed images of different formats too:

![Deal With It](docs/images/deal-with-it.gif?raw=true "Deal With It")

And you can embed external images too:

![Random](https://thiscatdoesnotexist.com/)

## Comments

If you'd like to make additional comments that is important for your module entry.
