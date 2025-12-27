export async function fetchRegional (regional) {

	const { conditionCheck } = await import("../../shared/condition/conditionCheck.js");
	const { errorHandle } = await import("../../shared/manageError/errorHandle.js");
	const { attemptFetch } = await import("../modules/attemptFetch.js");

	// ---------------

	if (await conditionCheck(regional, "object")) {

		let fetchURL;

		const baseURL = "https://api.carbonintensity.org.uk/regional";

		let fetchRegion;
		let fetchDate;
		let regionID;
		const regionKind = regional.region === "all" ? "all" : "specified";

		if (regionKind === "all") {
			fetchRegion = "";
		}

		else if (regionKind === "specified") {

			switch (regional.region) {

				case "england": {
					regionID = "15";
					break;
				}

				case "scotland": {
					regionID = "16";
					break;
				}

				case "wales": {
					regionID = "17";
					break;
				}

			}

			fetchRegion = `/regionid/${regionID}`;

		}

		if (regional.mode === "current") {
			fetchDate = "";
		}

		else if (regional.mode === "custom") {
			fetchDate = `/intensity/${regional.startDate}/${regional.endDate}`;
		}

		if (!!fetchDate === false && !!fetchRegion === true) {
			fetchURL = encodeURI(baseURL + fetchRegion);
		}

		else if (!!fetchRegion === false && !!fetchDate === true) {
			fetchURL = encodeURI(baseURL + fetchDate);
		}

		else if (!!fetchDate === true && !!fetchRegion === true) {
			fetchURL = encodeURI(baseURL + fetchDate + fetchRegion);
		}

		else if (!!fetchDate === false && !!fetchRegion === false) {
			fetchURL = encodeURI(baseURL);
		}

		const returnResult = await attemptFetch(fetchURL);

		if (await conditionCheck(returnResult, "object")) {
			return returnResult;
		}

		else {
			await errorHandle(7214, "fetchRegional");
			return false;
		}

	}

	else {
		await errorHandle(5848, "fetchRegional");
		return false;
	}

}