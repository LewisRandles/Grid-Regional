export async function checkResult (response, jsonValue) {

	const { errorHandle } = await import("../../shared/manageError/errorHandle.js");

	// ---------------

	const contentType = response?.headers.get("content-type");

	if (contentType && contentType?.includes("application/json")) {

		try {

			const parseTest = JSON.parse(jsonValue);

			if (parseTest) {
				return parseTest;
			}

			else {
				await errorHandle(5468, "checkResult");
				return false;
			}

		}

		catch (e) {
			await errorHandle(4366, "checkResult");
			return false;
		}

	}

	else {
		await errorHandle(4337, "checkResult");
		return false;
	}

}