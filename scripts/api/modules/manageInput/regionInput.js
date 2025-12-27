export async function regionInput (regionValue) {

	const { spaceFormat } = await import("../../../shared/spaceFormat.js");
	const { errorHandle } = await import("../../../shared/manageError/errorHandle.js");
	const { patternTest } = await import("../../../shared/patternTest.js");

	// ---------------

	const characterCheck = await patternTest(regionValue, "pattern4", 5556, "regionInput");

	if (characterCheck) {

		const formatValue = (await spaceFormat(String(characterCheck), "singleSpace")).toLowerCase();

		if (formatValue) {

			switch (formatValue) {

				case "england":
				case "scotland":
				case "wales": {
					return formatValue;
				}

				default: {
					await errorHandle(8282, "regionInput");
					return false;
				}

			}

		}

		else {
			await errorHandle(3577, "regionInput");
			return false;
		}

	}

}