//Ordering is important here, as it is used to determine the program level for a user.
// The DB stores these values as numbers refering to the index of the array.
// If this ever changes, the database/frontend will need to be updated.

import { LEVEL_NAMES } from './levels';

export const WORKSHEET_DATA: WorksheetSelectableData = {
	level: LEVEL_NAMES,
	session: ['Spring', 'Summer', 'Fall', 'Winter'],
	day: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun', 'Weekly'],
	location: ['Rec', 'Dun'],
};
