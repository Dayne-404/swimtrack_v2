import { useState } from 'react';
import type { WorksheetFilters } from '../contexts/FilterContext';
import type { ReactNode } from 'react';
import { FilterContext } from '../contexts/FilterContext';

const DEFAULT_FILTERS: WorksheetFilters = {
	level: [],
	year: [],
	session: [],
	day: [],
	time: [],
	location: [],
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
	const [filters, setFilters] = useState<WorksheetFilters>(DEFAULT_FILTERS);

	const updateFilter = (field: keyof WorksheetFilters, value: string | number) => {
		setFilters((prev) => {
			const current = prev[field] as Array<string | number>;
			if (current.includes(value)) return prev;

			return {
				...prev,
				[field]: [...current, value],
			};
		});
	};

	const clearFilter = () => {
		setFilters(DEFAULT_FILTERS);
	};

	return (
		<FilterContext.Provider value={{ filters, updateFilter, clearFilter }}>
			{children}
		</FilterContext.Provider>
	);
};
