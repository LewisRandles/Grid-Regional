
import gridRegional from "./gridRegional_bundled.js";

// ---------------

const apiConfig = {
	"mode": "current",
	"region": "england",
	"startDate": "2025-01-01",
	"endDate": "2025-01-02"
};

const result = await gridRegional(apiConfig);

console.log(result);