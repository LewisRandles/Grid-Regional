export async function formatItem (item) {

	const { errorHandle } = await import("../../../shared/manageError/errorHandle.js");
	const { conditionCheck } = await import("../../../shared/condition/conditionCheck.js");

	// ---------------

	if (await errorHandle("status")) {

		const getMix = item.generationmix;

		if (await conditionCheck(getMix, "array")) {

			item["generationmix"] = await getMix.reduce(function (acc, cur) {
				acc[String(cur.fuel)] = String(cur.perc);
				return acc;
			}, {});

			return item;

		}

		else {
			await errorHandle(3583, "formatItem");
			return false;
		}

	}

	else {
		await errorHandle(9432, "formatItem");
		return false;
	}

}