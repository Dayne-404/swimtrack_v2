import { useState } from 'react';
import type { ReactNode } from 'react';
import { FilterContext } from '../contexts/FilterContext';
import { DEFAULT_FILTERS } from '../common/constants/defaultFilters';


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

	const buildFilterQuery = (): URLSearchParams => {
		const params = new URLSearchParams();

		for (const key in filters) {
			const values = filters[key as keyof WorksheetFilters];
			values.forEach((val) => {
				params.append(key, val.toString());
			});
		}

		return params;
	};

	return (
		<FilterContext.Provider value={{ filters, updateFilter, buildFilterQuery, clearFilter }}>
			{children}
		</FilterContext.Provider>
	);
};
