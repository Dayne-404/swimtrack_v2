import { createContext, useContext } from 'react';

// Create the context type
interface SortingContextType {
    sorting: WorksheetSortFields;
    updateSorting: (field: keyof WorksheetSortFields, value: 0 | 1 | 2) => void;
    buildSortQuery: () => URLSearchParams;
    clearSorting: () => void;
}

// Create the context
export const SortingContext = createContext<SortingContextType | undefined>(undefined);

// Custom hook to use the context
export const useSort = (): SortingContextType => {
    const context = useContext(SortingContext);
    if (!context) throw new Error('useSorting must be used within a FilterProvider');
    return context;
};
