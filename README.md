<div align="center"> <img width="300px" src="https://github.com/LewisRandles/Grid-Regional/blob/6f7a36f46797f46642284f0ef4f05348fa67b995/GRID%20REGIONAL.png"> </div>

<h1 align="center">Grid Regional API Repacker</h1>

<p align="center">Explore regional electricity carbon intensity and generation mix trends using UK power grid data.</p>

<div align="center"> <img src="https://img.shields.io/badge/Release-V1.0-2EA44F?style=for-the-badge" alt="Badge"> <img src="https://img.shields.io/badge/maintained-yes-2EA44F?style=for-the-badge" alt="Badge"> <img src="https://img.shields.io/badge/Uncompressed-40.4%20kb-007ec6?style=for-the-badge" alt="Badge"> <img src="https://img.shields.io/badge/compressed-29%20kb-007ec6?style=for-the-badge" alt="Badge"> <img src="https://img.shields.io/badge/Licence-MIT-007ec6?style=for-the-badge" alt="Badge"> </div>

<br>

# Introduction

Grid Regional is a free, no-auth, user-friendly API library that provides access to real-time and forecasted regional electricity generation mix data from the Carbon Intensity API. This project makes it easy to explore how energy contributions vary across different areas. It’s designed for everyone from energy analysts and students to educators and planners who want to study generation trends and carbon intensity impacts without complex software or specialized expertise.

<br>
 
# Table of Contents

- [Downloading](#downloading)
	- [Different Versions](#different-versions)
	- [Download Page](#download-page)
- [Installing](#installing)
	- [In your JavaScript file](#in-your-javascript-file)
- [Usage](#usage)
	- [No Parameters](#no-parameters)
	- [First Parameter](#first-parameter)
	- [Second Parameter](#second-parameter)
	- [Third Parameter](#third-parameter)
	- [Fourth Parameter](#fourth-parameter)
- [Processing](#processing)
	- [Normalisation](#normalisation)
	- [Sanitization](#sanitization)
 - [Customisation](#customisation)
	- [Parent Names](#parent-names)
	- [Child Names](#child-names)
- [Demo](#demo)
	- [Live Demo](#live-demo)
- [Authors](#authors)
- [Credit](#credit)
- [License](#license)

<br>

# Downloading

### Different Versions
Each release provides two configuations of the project.

 - The bundled, minified format known as "production".
 - The unbundled, unminified format known as "development".

### Download Page
[https://github.com/LewisRandles/Grid-Regional/releases](https://github.com/LewisRandles/Grid-Regional/releases)

<br>

# Installing

### In your JavaScript file

```javascript

	// Using the unbundled version needs to be kept with the internal files.
	import gridRegional from './scripts/gridRegional_unbundled.js';

	// Using the bundled version is standalone and has no internal files.
	import gridRegional from './gridRegional_bundled.js';

```

<br>

# Usage

### No Parameters

Providing no parameters will result in the default information being set.

```javascript
await gridRegional();
```

<br>

### First Parameter

The first parameter is providing the desired `mode`. The format is case-insensitive.

| First Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `mode` | `string` |  Supported `mode` formats include `current` and `custom`. |

| Usage | Type | Description |
| :-------- | :------- | :------------------------- |
| `current` | `string` | Get Regional Carbon Intensity data for current half hour. All times provided in UTC (+00:00). |
| `custom` | `string` | Get generation mix between `startDate` and `endDate` times. All times provided in UTC (+00:00). |

```javascript

// Argument object.
await gridRegional({"mode": "current"});

```

```javascript

// External object.
const apiConfig = {
	"mode": "current"
}

await gridRegional(apiConfig);

```

<br>

### Second Parameter
The second parameter is providing the desired `region` The format is case-insensitive.

| Second Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `region` | `string` | Supported `region` formats include `england`, `scotland` and `wales`. |

| Usage | Type | Description |
| :-------- | :------- | :------------------------- |
| `region` | `string` | Get Carbon Intensity data for current half hour of specified `region`. All times provided in UTC (+00:00). |

```javascript

// Argument object.
await gridRegional({"mode": "current", "region": "england"});

```

```javascript

// External object.
const apiConfig = {
	"mode": "current",
	"region": "england"
}

await gridRegional(apiConfig);

```

<br>

### Third Parameter
The third parameter is providing the desired `startDate` The format is case-insensitive.

| Third Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `startDate` | `string` | Supported `startDate` formats include `DD-MM-YYYY` and `YYYY-MM-DD`. |

| Usage | Type | Description |
| :-------- | :------- | :------------------------- |
| `startDate` | `string` | `startDate` is in ISO8601 format. |

```javascript

// Argument object.
await gridRegional({"mode": "current", "region": "england", "startDate": "2025-01-01"});

```

```javascript

// External object.
const apiConfig = {
	"mode": "current",
	"region": "england",
	"startDate": "2025-01-01"
}

await gridRegional(apiConfig);

```

<br>

### Fourth Parameter
The fourth parameter is providing the desired `endDate` The format is case-insensitive.

| Fourth Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `endDate` | `string` | Supported `endDate` formats include `DD-MM-YYYY` and `YYYY-MM-DD`. |

| Usage | Type | Description |
| :-------- | :------- | :------------------------- |
| `endDate` | `string` | `endDate` is in ISO8601 format. |

```javascript

// Argument object.
await gridRegional({"mode": "current", "region": "england", "startDate": "2025-01-01", "endDate": "2025-01-02"});

```

```javascript

// External object.
const apiConfig = {
	"mode": "current",
	"region": "england",
	"startDate": "2025-01-01",
	"endDate": "2025-01-02"
}

await gridRegional(apiConfig);

```

<br>

# Processing

### Normalisation
During normalization, raw API fields such as `"regions":[{"regionid":15,"dnoregion":"England", ...}]`, are converted into a processed object such as `"data":{"object0":{"from":"2024-12-31T23:30","to":"2025-01-01T00:00", ...}}`. Objects provide more reliable and consistent access than arrays while enabling easier manipulation and processing of nested data structures. Nested objects are flattened, redundant metadata and overlapping identifiers are removed, empty or missing fields are normalized, boolean and encoded values are standardized, and all data is organized into a uniform, consistent key-value JSON structure to produce a clean and predictable final result.

### Sanitization
During sanitization, instead of leaving object values as `null` or `undefined`, missing or empty fields are filled with a placeholder such as `"no value"` to ensure that every key in the final result has a valid string; this prevents errors in downstream processing, makes the dataset fully predictable, and allows client applications to safely read and display all values without additional null checks.

<br>

# Customisation
This JSON serves as a configuration layer that lets you enable or disable individual parent and child fields and rename them through `altName`, giving you full control over which properties appear in the final output. Some values from the raw API return are intentionally omitted because they are considered unnecessary or not useful.

### Parent Names
The parents group defines the top-level fields that can be enabled, disabled, or renamed, allowing you to control which main object properties appear in the output.

```javascript

"parents": {

	"item1": {
		"name": {
			"original": "defaultName",
			"altName": "customName"
		},
		"used": true
	},

	...

}

```

### Child Names
The children group manages the nested fields within those parent objects, giving similar control over which sub-properties are included and how they are labeled.

```javascript

"children": {
	
	"item1": {
		"name": {
			"original": "defaultName",
			"altName": "customName"
		},
		"used": true,
		"validate": "checkRegional"
	},

	...

}

```

<br>

# Demo

### Live Demo
Try the hosted demo via [GitHub Pages Demo](https://lewisrandles.github.io/Grid-Regional)

<br>

# Authors

- [@LewisRandles](https://www.github.com/LewisRandles)


<br>

# Credit

 - For regional API information, the [regional API](https://carbon-intensity.github.io/api-definitions/#regional)

<br>

# License

[MIT License](https://github.com/LewisRandles/Grid-Regional/blob/main/LICENSE)
