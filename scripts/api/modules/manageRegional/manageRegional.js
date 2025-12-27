export async function manageRegional (regional) {

	const { errorHandle } = await import("../../../shared/manageError/errorHandle.js");
	const { getRegional } = await import("./getRegional.js");

	// ---------------

	if (!await errorHandle("status")) { return false; }

	const getRegionalValue = await getRegional(regional);

	if (getRegionalValue) {
		return getRegionalValue;
	}

	else {
		await errorHandle(1900, "manageRegional");
		return false;
	}

}