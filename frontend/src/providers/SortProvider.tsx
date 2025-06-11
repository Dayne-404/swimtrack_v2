import { useState } from 'react';
import type { ReactNode } from 'react';
import { SortingContext } from '../contexts/SortContext';
import { DEFAULT_SORTING } from '../common/constants/defaultSorting';


export const SortingProvider = ({ children }: { children: ReactNode }) => {
	const [sorting, setSorting] = useState<WorksheetSortFields>(DEFAULT_SORTING);

	const updateSorting = (field: keyof WorksheetSortFields, value: 0 | 1 | 2) => {
		setSorting((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const buildSortQuery = (): URLSearchParams => {
		const params = new URLSearchParams();

		Object.entries(sorting).forEach(([key, value]) => {
			if (value === 1) {
				params.append('sort', key); // ascending
			} else if (value === 2) {
				params.append('sort', `-${key}`); // descending
			}
		});

		return params;
	};

	const clearSorting = () => {
		setSorting(DEFAULT_SORTING);
	};

	return (
		<SortingContext.Provider value={{ sorting, buildSortQuery, updateSorting, clearSorting }}>
			{children}
		</SortingContext.Provider>
	);
};
