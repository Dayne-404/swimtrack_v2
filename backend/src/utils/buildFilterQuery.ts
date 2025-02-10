import { FILTER_FIELDS } from '../config/worksheetOrdering';
import WorksheetFilterFields, { NUMERIC_FIELDS } from '../config/worksheetFilterFields';

/**
 * Builds a MongoDB query object for filtering worksheets based on the provided filter fields.
 * If a userId is provided then this is the ID of the user MAKING the request so it will override a filter for
 * any other user
 *
 * @param {WorksheetFilterFields} filters - The filters applied to the worksheet query.
 * @param {string | undefined} userId - The ID of the user, used when `specific` is true.
 * @param {boolean} specific - If true, ensures the query is limited to the specific user.
 * @returns {WorksheetFilterFields} - The constructed query object for filtering worksheets.
 */
const buildFiltersQuery = (
	filters: WorksheetFilterFields,
	userId: string | undefined = undefined,
): WorksheetFilterFields => {
	const query: WorksheetFilterFields = {};

	FILTER_FIELDS.forEach((field) => {
		const key = field as keyof WorksheetFilterFields;
		const value = filters[key];

		if (value) {
			let valuesArray = Array.isArray(value) ? value : [value];

			valuesArray = valuesArray.map((val) => {
				if (NUMERIC_FIELDS.has(key) && typeof val === 'string' && !isNaN(Number(val))) {
					return Number(val); 
				}
				return val;
			});

			if (userId) query.userId = userId;
			query[key] = { $in: valuesArray } as any;
		}
	});

	return query;
};

export default buildFiltersQuery;
