export default interface WorksheetFilterFields {
	user?: string;
	level?: number;
	year?: number;
	session?: number;
	day?: number;
	time?: string;
	location?: number;
}

export const NUMERIC_FIELDS = new Set<keyof WorksheetFilterFields>([
    'level',
    'year',
    'session',
    'day',
    'location',
]);