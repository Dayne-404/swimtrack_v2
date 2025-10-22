export interface WorksheetSortFields {
	level?: number;
	year?: number;
	session?: number;
	day?: number;
	time?: number;
	location?: number;
    createdAt?: number;
    updatedAt?: number;
}

export const SORT_FIELDS = ['level', 'year', 'session', 'day', 'time', 'location', 'createdAt', 'updatedAt'];