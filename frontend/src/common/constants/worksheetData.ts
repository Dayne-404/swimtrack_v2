//Ordering is important here, as it is used to determine the program level for a user.
// The DB stores these values as numbers refering to the index of the array.
// If this ever changes, the database/frontend will need to be updated.

import { PROGRAM_NAMES } from './programs';

interface WorksheetSelectableData {
	programs: string[];
	sessions: string[];
	days: string[];
	locations: string[];
}

interface WorksheetTypeableData {
	times: string[];
	years: string[];
}

export const WORKSHEET_DATA: WorksheetSelectableData = {
	programs: PROGRAM_NAMES,
	sessions: ['Spring', 'Summer', 'Fall', 'Winter'],
	days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun', 'Weekly'],
	locations: ['Rec', 'Dun'],
};

type FilterFromData<T> = {
	[K in keyof T]: number[];
};

export type WorksheetFilters = FilterFromData<WorksheetSelectableData> & WorksheetTypeableData;
