import { useState } from 'react';
import type { ReactNode } from 'react';
import { SortingContext } from '../contexts/SortContext';

const DEFAULT_SORTING: WorksheetSortFields = {
    level: 0,
    year: 0,
    session: 0,
    day: 0,
    time: 0,
    createdAt: 0,
    updatedAt: 0
};

export const SortingProvider = ({ children }: { children: ReactNode }) => {
    const [sorting, setSorting] = useState<WorksheetSortFields>(DEFAULT_SORTING);

    const updateSorting = (field: keyof WorksheetSortFields, value: 0 | 1 | 2) => {
        setSorting((prev) => ({
            ...prev,
            [field]: value
        }))
    };

    const clearSorting = () => {
        setSorting(DEFAULT_SORTING)
    };

    return (
        <SortingContext.Provider value={{ sorting, updateSorting, clearSorting }}>
            {children}
        </SortingContext.Provider>
    );
};
