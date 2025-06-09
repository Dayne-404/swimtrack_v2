export const buildQueryParams = (
	filters?: Record<string, (number | string)[]>,
	sorting?: Record<string, number>
): URLSearchParams => {
	const params = new URLSearchParams();

	if (filters) {
		Object.entries(filters).forEach(([key, values]) =>
			values.forEach((value) => params.append(key, String(value)))
		);
	}

	if (sorting) {
		Object.entries(sorting).forEach(([key, value]) =>
			params.append('sort', `${value === 1 ? '-' : ''}${key}`)
		);
	}

	return params;
};