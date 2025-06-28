declare global {
	export interface Student {
		_id?: string;
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
	type WorksheetTypeableKeys = 'time' | 'year';

	type WorksheetSortableKeys =
		| 'level'
		| 'session'
		| 'day'
		| 'time'
		| 'year'
		| 'createdAt'
		| 'updatedAt';

	export type WorksheetSelectableData = {
		[K in WorksheetSelectableKeys]: string[];
	};

	export type WorksheetFilters = { [K in WorksheetSelectableKeys]: number[] } & {
		[K in WorksheetTypeableKeys]: string[];
	};

	export type WorksheetFormData = { [K in WorksheetSelectableKeys]: number } & {
		[K in WorksheetTypeableKeys]: string;
	};

	export type WorksheetSortFields = { [K in WorksheetSortableKeys]: 0 | 1 | 2 };

	export type WorksheetValidationErrors = {
		[key in keyof WorksheetFormData]?: string;
	} & {
		user?: string;
		students?: boolean[];
	};
}

export {};
