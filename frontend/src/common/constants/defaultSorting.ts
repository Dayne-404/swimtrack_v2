export const DEFAULT_SORTING: WorksheetSortFields = {
    level: 0,
    year: 0,
    session: 0,
    day: 0,
    time: 0,
    location: 0,
    createdAt: 1, // default to newest first
    updatedAt: 0,
};

//TODO make this its own function?
const params = new URLSearchParams();

Object.entries(DEFAULT_SORTING).forEach(([key, value]) => {
	if (value === 1) {
		params.append('sort', key); // ascending
	} else if (value === 2) {
		params.append('sort', `-${key}`); // descending
	}
});

export const DEFAULT_SORT_QUERY = params;