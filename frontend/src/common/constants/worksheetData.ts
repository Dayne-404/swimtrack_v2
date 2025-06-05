//Ordering is important here, as it is used to determine the program level for a user.
// The DB stores these values as numbers refering to the index of the array.
// If this ever changes, the database/frontend will need to be updated.

import { PROGRAMS } from './programs';

const WORKSHEET_DATA = {
	programs: PROGRAMS,
	sessions: ['Spring', 'Summer', 'Fall', 'Winter'],
	days: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun', 'Weekly'],
	locations: ['Rec', 'Dun'],
};

export default WORKSHEET_DATA;
