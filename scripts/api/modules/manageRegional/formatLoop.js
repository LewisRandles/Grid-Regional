export async function formatLoop (item, mode) {

	const { conditionCheck } = await import("../../../shared/condition/conditionCheck.js");
	const { errorHandle } = await import("../../../shared/manageError/errorHandle.js");
	const { formatItem } = await import("./formatItem.js");

	// ---------------

	const setState = (mode === "custom") ? item : item[0];
	const getData = setState.data;

	if (await errorHandle("status")) {

		if (await conditionCheck(getData, "array")) {

			const newResult = {};
			let index = 0;

			for await (const key of Object.keys(getData)) {

				const value = getData[key];

				if (value !== undefined) {

					newResult[`object${index}`] = await formatItem(value);
				
				}

				else {
					await errorHandle(1445, "formatLoop");
					return false;
				}

				index++;

			}

			setState.data = newResult;

			return setState;

		}

		else {
			await errorHandle(1525, "formatLoop");
			return false;
		}

	}

	else {
		await errorHandle(3834, "formatLoop");
		return false;
	}

}