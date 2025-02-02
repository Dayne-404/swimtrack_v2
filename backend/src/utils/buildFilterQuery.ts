import { FILTER_FIELDS } from '../config/worksheetOrdering';
import WorksheetFilterFields from '../config/worksheetFilterFields';

const buildFiltersQuery = (
	filters: WorksheetFilterFields,
	userId: string,
	specific: boolean
): WorksheetFilterFields => {
	let query: WorksheetFilterFields = {};

	if (specific && userId) query.userId = userId;
	else if (filters.userId) query.userId = filters.userId;

	FILTER_FIELDS.forEach((field) => {
		const key = field as keyof WorksheetFilterFields;

		if (filters[key]) {
			query[key] = {
				$in: Array.isArray(filters[key]) ? filters[key] : [filters[key]],
			} as any;
		}
	});

	return query;
};

export default buildFiltersQuery;
