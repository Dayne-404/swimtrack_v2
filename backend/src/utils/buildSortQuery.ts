import { SORT_FIELDS } from '../config/worksheetOrdering';
import { WorksheetSortFields } from '../config/worksheetSortFields';

//It is between God and I how this was supposed to work.
//I have to come back and fix this grossness
const buildSortQuery = (sort: string[]): WorksheetSortFields => {
	const sortQuery: WorksheetSortFields = {};
	const sortArray: string | string[] = Array.isArray(sort) ? sort : [sort];

    SORT_FIELDS.forEach((field) => {
        const key = field as keyof WorksheetSortFields;

        sortArray.forEach((requestedField) => {
            const order = requestedField.startsWith('-') ? -1 : 1;
            const sortKey = requestedField.replace(/^-/, '');
            if(sortKey === field) sortQuery[key] = order;
        })
    })

	return sortQuery;
};

export default buildSortQuery;