import { Button, Stack } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

interface Props {
	disabled?: boolean;
	includeInstructorSearch?: boolean;
	setFilterModalOpen: (value: boolean) => void;
	setSortModalOpen: (value: boolean) => void;
}

export const WorksheetGridHeader = ({
	disabled,
	//includeInstructorSearch, //TODO Will come back to this later
	setFilterModalOpen,
	setSortModalOpen,
}: Props) => {
	return (
		<>
			<Stack direction="row" spacing={1}>
				<Button
					disabled={disabled}
					variant="outlined"
					onClick={() => setFilterModalOpen(true)}
					startIcon={<FilterAltIcon />}
                    fullWidth
				>
					Filter
				</Button>
                <Button
					disabled={disabled}
					variant="outlined"
					onClick={() => setSortModalOpen(true)}
					startIcon={<SortIcon />}
                    fullWidth
				>
					Sort
				</Button>
			</Stack>
		</>
	);
};
