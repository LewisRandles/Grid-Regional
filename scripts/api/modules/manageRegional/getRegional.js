export async function getRegional (regional) {

	const { errorHandle } = await import("../../../shared/manageError/errorHandle.js");
	const { fetchRegional } = await import("../../components/fetchRegional.js");
	const { sendProcess } = await import("../sendProcess.js");
	const { conditionCheck } = await import("../../../shared/condition/conditionCheck.js");
	const { regionalNames } = await import("./regionalNames.js");
	const { formatLoop } = await import("./formatLoop.js");
	const { objectLoop } = await import("../manageProcess/objectLoop.js");

	// ---------------

	if (!await errorHandle("status")) { return false; }

	const getModeValue = await fetchRegional(regional);

	if (getModeValue) {

		const returnValue = await formatLoop(getModeValue.data, regional.mode);

		if (await conditionCheck(returnValue, "object")) {

			const getAmount = await objectLoop(returnValue);

			const itemStorage = {

				"regional": {
					"type": "object",
					"value": returnValue
				},

				"amount": {
					"type": "number",
					"value": getAmount
				},

				"name": {
					"type": "object",
					"value": regionalNames
				}

			};

			const getProcess = await sendProcess(itemStorage);

			if (getProcess) {

				return getProcess;

			}

			else {
				await errorHandle(2344, "getRegional");
				return false;
			}

		}

		else {
			await errorHandle(5659, "getRegional");
			return false;
		}

	}

	else {
		await errorHandle(5667, "getRegional");
		return false;
	}

}