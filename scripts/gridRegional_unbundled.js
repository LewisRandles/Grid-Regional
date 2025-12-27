export default async function gridRegional (apiConfig) {

	const { getAPI } = await import("./api/getAPI.js");
	const { conditionCheck } = await import("./shared/condition/conditionCheck.js");
	const { baseInput } = await import("./api/modules/manageInput/baseInput.js");
	const { errorHandle } = await import("./shared/manageError/errorHandle.js");
	const { resultValue } = await import("./shared/resultValue.js");
	const { errorStatus } = await import("./shared/manageError/errorStatus.js");
	const { initialValue } = await import("./shared/initialValue.js");

	// ---------------

	const initialCheck = await initialValue(apiConfig);

	if (await conditionCheck(initialCheck, "object")) {

		const selectedConfig = await baseInput(initialCheck);

		if (!await errorHandle("status")) { return false; }

		if (selectedConfig) {

			const getStart = new Date(selectedConfig.startDate).getTime();
			const getEnd = new Date(selectedConfig.endDate).getTime();

			if (getStart < getEnd) {

				const apiValue = await getAPI(selectedConfig);

				if (apiValue) {
					return await resultValue(apiValue);
				}

				else {
					await errorHandle(8964, "gridRegional");
					return await resultValue(errorStatus.lastError);
				}

			}

			else {
				await errorHandle(9567, "gridRegional");
				return await resultValue(errorStatus.lastError);
			}

		}

		else {
			await errorHandle(6534, "gridRegional");
			return await resultValue(errorStatus.lastError);
		}

	}

	else {
		await errorHandle(6573, "gridRegional");
		return await resultValue(errorStatus.lastError);
	}

}