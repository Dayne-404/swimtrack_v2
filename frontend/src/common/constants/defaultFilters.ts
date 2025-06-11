export const DEFAULT_FILTERS: WorksheetFilters = {
    level: [],
    year: [],
    session: [],
    day: [],
    time: [],
    location: [],
};

const params = new URLSearchParams();

		for (const key in DEFAULT_FILTERS) {
			const values = DEFAULT_FILTERS[key as keyof WorksheetFilters];
			values.forEach((val) => {
				params.append(key, val.toString());
			});
		}

export const DEFAULT_FILTER_QUERY = params;