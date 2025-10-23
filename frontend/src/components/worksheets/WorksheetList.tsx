import { Stack } from '@mui/material';
import { WorksheetGridHeader } from './WorksheetGridHeader';
import WorksheetGrid from './WorksheetGrid';
import { useState } from 'react';
import FilterModal from '../modals/FilterModal';
import SortModal from '../modals/SortModal';

import { FilterProvider } from '../../providers/FilterProvider';
import { SortingProvider } from '../../providers/SortProvider';
import { DEFAULT_FILTER_QUERY } from '../../common/constants/defaultFilters';
import { DEFAULT_SORT_QUERY } from '../../common/constants/defaultSorting';

interface Props {
	worksheets?: Worksheet[];
	totalWorksheets?: number;
	specific?: boolean;
	showUsers?: boolean;
	showUpdatedAt?: boolean;
}

const WorksheetList = ({ worksheets = [], totalWorksheets, showUsers = false, specific = false }: Props) => {
	const [filterParams, setFilterParams] = useState<URLSearchParams>(DEFAULT_FILTER_QUERY);
	const [sortParams, setSortParams] = useState<URLSearchParams>(DEFAULT_SORT_QUERY); 
	const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
	const [sortModalOpen, setSortModalOpen] = useState<boolean>(false);

	if (!totalWorksheets) totalWorksheets = worksheets.length;

	return (
		<FilterProvider>
			<SortingProvider>
				<Stack spacing={1} width="100%">
					<FilterModal
						isOpen={filterModalOpen}
						setOpen={setFilterModalOpen}
						params={filterParams}
						setParams={setFilterParams}
						showUserSearch={showUsers}
					/>
					<SortModal
						isOpen={sortModalOpen}
						setOpen={setSortModalOpen}
						params={sortParams}
						setParams={setSortParams}
					/>
					<WorksheetGridHeader
						setFilterModalOpen={setFilterModalOpen}
						setSortModalOpen={setSortModalOpen}
					/>
					<WorksheetGrid
						params={{ filter: filterParams, sort: sortParams }}
						specific={specific}
						showUser={showUsers}
					/>
				</Stack>
			</SortingProvider>
		</FilterProvider>
	);
};

export default WorksheetList;
