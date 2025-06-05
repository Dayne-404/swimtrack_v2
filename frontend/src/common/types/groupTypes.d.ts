declare global {
	export interface Group {
		_id: string;
		user: string;
		name: string;
		worksheets: string[];
		createdAt: string;
		updatedAt: string;
	}
}

export {};
