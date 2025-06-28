const validateTime = (time: string): boolean => {
	if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) return true;

	return false;
};

const validateYear = (year: string) => {
	if (/^\d{4}$/.test(year)) return true;

	return false;
};

export { validateTime, validateYear };
