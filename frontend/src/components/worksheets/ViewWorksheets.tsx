import { Stack } from '@mui/material';
import { WorksheetGridHeader } from '../misc/WorksheetGridHeader';
import WorksheetGrid from '../misc/WorksheetGrid';
import { useState } from 'react';
import FilterModal from '../modals/FilterModal';

interface Props {
	worksheets?: Worksheet[];
	totalWorksheets?: number;
	loading?: boolean;
	showUser?: boolean;
	showUpdatedAt?: boolean;
}

const ViewWorksheets = ({ worksheets = [], totalWorksheets, loading = false, showUser }: Props) => {
	const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
	const [sortModalOpen, setSortModalOpen] = useState<boolean>(false);

	if (!totalWorksheets) totalWorksheets = worksheets.length;

	return (
		<Stack spacing={1} width="100%">
            <FilterModal isOpen={filterModalOpen} />
			<WorksheetGridHeader
				setFilterModalOpen={setFilterModalOpen}
				setSortModalOpen={setSortModalOpen}
			/>
			<WorksheetGrid worksheets={worksheets} loading={loading} showUser={showUser} />
		</Stack>
	);
};

export default ViewWorksheets;
