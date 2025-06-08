declare global {
	export interface Student {
		_id: string;
		name: string;
		skills: boolean[];
		passed: boolean;
	}

	export interface Worksheet {
		_id: string;
		user: User;
		level: number;
		year: number;
		session: number;
		day: number;
		time: string;
		location: number;
		students: Student[];
		createdAt: string;
		updatedAt: string;
	}

	export interface NewWorksheet {
		userId: string;
		level: number | null;
		session: number | null;
		day: number | null;
		time: string;
		year: string | number;
		location: number | null;
		students: Student[];
	}

	type WorksheetSelectableKeys = 'level' | 'session' | 'day' | 'location';
	type WorksheetTypeableKeys = 'time' | 'year'

	export type WorksheetSelectableData = {
		[K in WorksheetSelectableKeys]: string[];
	};

	export type WorksheetFilters =
		{ [K in WorksheetSelectableKeys]: number[] } &
		{ [K in WorksheetTypeableKeys]: string[] };
}

export {};
