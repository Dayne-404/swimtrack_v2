import { Stack } from '@mui/material';
import { WorksheetGridHeader } from './WorksheetGridHeader';
import WorksheetGrid from './WorksheetGrid';
import { useState } from 'react';
import FilterModal from '../modals/FilterModal';
import SortModal from '../modals/SortModal';

interface Props {
	worksheets?: Worksheet[];
	totalWorksheets?: number;
	loading?: boolean;
	showUser?: boolean;
	showUpdatedAt?: boolean;
}

const WorksheetList = ({ worksheets = [], totalWorksheets, loading = false, showUser }: Props) => {
	const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
	const [sortModalOpen, setSortModalOpen] = useState<boolean>(false);

	if (!totalWorksheets) totalWorksheets = worksheets.length;

	const handleFilterClose = () => {
		//Build filter Query.
		//Get the worksheets
		
		setFilterModalOpen(false)
	}

	const handleSortClose = () => {
		//Build sort Query
		//Get the worksheets

		setSortModalOpen(false)
	}

	return (
		<Stack spacing={1} width="100%">
            <FilterModal isOpen={filterModalOpen} handleClose={handleFilterClose}/>
			<SortModal isOpen={sortModalOpen} handleClose={handleSortClose} />
			<WorksheetGridHeader
				setFilterModalOpen={setFilterModalOpen}
				setSortModalOpen={setSortModalOpen}
			/>
			<WorksheetGrid worksheets={worksheets} loading={loading} showUser={showUser} />
		</Stack>
	);
};

export default WorksheetList;
