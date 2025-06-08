import { useState } from 'react';
import type { WorksheetFilters } from '../common/constants/worksheetData';
import type { ReactNode } from 'react';
import { FilterContext } from '../contexts/FilterContext';

const DEFAULT_FILTERS: WorksheetFilters = {
	programs: [],
	years: [],
	sessions: [],
	days: [],
	times: [],
	locations: [],
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

	const clearFilter = (filter?: {
		field: keyof WorksheetFilters;
		value: string | number | (string | number)[];
	}) => {
		if (!filter) {
			setFilters(DEFAULT_FILTERS);
			return;
		}

		const { field, value } = filter;

		setFilters((prev) => {
			const currentValues = prev[field] as (string | number)[];
			const valuesToRemove = Array.isArray(value) ? value : [value];

			return {
				...prev,
				[field]: currentValues.filter((item) => !valuesToRemove.includes(item)),
			};
		});
	};

	return (
		<FilterContext.Provider value={{ filters, updateFilter, clearFilter }}>
			{children}
		</FilterContext.Provider>
	);
};
