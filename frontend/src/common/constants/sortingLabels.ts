export const SORT_LABELS_BY_FIELD: {
	[K in WorksheetSortableKeys]: Record<0 | 1 | 2, string>
} = {
	level: {
		0: 'No Sort',
		1: 'Highest',
		2: 'Lowest',
	},
	session: {
		0: 'No Sort',
		1: 'Start (Spring)',
		2: 'End (Winter)',
	},
	day: {
		0: 'No Sort',
		1: 'Start (Mon)',
		2: 'End (Sun)',
	},
	time: {
		0: 'No Sort',
		1: 'Earliest',
		2: 'Latest',
	},
	year: {
		0: 'No Sort',
		1: 'Earliest',
		2: 'Latest',
	},
	createdAt: {
		0: 'No Sort',
		1: 'Newest',
		2: 'Oldest',
	},
	updatedAt: {
		0: 'No Sort',
		1: 'Newest',
		2: 'Oldest',
	},
};