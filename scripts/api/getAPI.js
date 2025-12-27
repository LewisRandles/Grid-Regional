export async function getAPI (apiConfig) {

	const { manageRegional } = await import("./modules/manageRegional/manageRegional.js");
	const { errorHandle } = await import("../shared/manageError/errorHandle.js");

	// ---------------

	const getRegional = await manageRegional(apiConfig);

	if (!await errorHandle("status")) { return false; }

	return {
		"regional": getRegional
	};

}