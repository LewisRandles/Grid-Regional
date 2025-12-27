export async function dateInput (dateValue) {

	const { spaceFormat } = await import("../../../shared/spaceFormat.js");
	const { errorHandle } = await import("../../../shared/manageError/errorHandle.js");
	const { patterns } = await import("../../../shared/manageRegex.js");
	const { dateFormat } = await import("../manageRegional/dateFormat.js");

	// ---------------

	let characterCheck;

	if (patterns.pattern7.test(dateValue) || patterns.pattern8.test(dateValue)) {

		const removeTimezone = dateValue.replace(patterns.pattern6, "");

		if (patterns.pattern8.test(dateValue)) {
			characterCheck =  await dateFormat(removeTimezone);
		}

		else {
			characterCheck = removeTimezone;
		}

	}

	else {
		await errorHandle(3752, "dateInput");
		return false;
	}

	if (characterCheck) {

		const formatValue = (await spaceFormat(String(characterCheck), "singleSpace")).toLowerCase();

		if (formatValue) {
			return formatValue;
		}

		else {
			await errorHandle(2274, "dateInput");
			return false;
		}

	}

	else {
		await errorHandle(1123, "dateInput");
		return false;
	}

}