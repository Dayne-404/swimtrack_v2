export const validateStandardTime = (time: string): boolean => {
	if (/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.test(time)) return true;

	return false;
};

export const validateYear = (year: string) => {
	if (/^\d{4}$/.test(year)) return true;

	return false;
};
