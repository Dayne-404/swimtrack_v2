import { createContext, useContext } from 'react';

// Create the context type
interface FilterContextType {
	filters: WorksheetFilters;
	updateFilter: (field: keyof WorksheetFilters, value: string | number) => void;
	buildFilterQuery: () => URLSearchParams
	clearFilter: (filter?: {
		field: keyof WorksheetFilters,
		value: (number | string) | (number[] | string[])
	}) => void;
}

// Create the context
export const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Custom hook to use the context
export const useFilter = (): FilterContextType => {
	const context = useContext(FilterContext);
	if (!context) throw new Error('useFilter must be used within a FilterProvider');
	return context;
};
