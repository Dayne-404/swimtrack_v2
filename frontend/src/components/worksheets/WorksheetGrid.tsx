import { Box, Grid, Typography } from '@mui/material';
import WorksheetCard from './WorksheetCard';
import LoadingSpinner from '../common/LoadingSpinner';

interface Props {
	worksheets?: Worksheet[];
	showUser?: boolean;
	showUpdatedAt?: boolean;
	loading?: boolean;
	BottomButton?: React.ReactElement;
	gridSpace?: number;
	alignItems?: 'center';
	selectable?: {
		canSelect: boolean;
		selected: string[];
		setSelected: React.Dispatch<React.SetStateAction<string[]>>;
	};
}

const WorksheetGrid = ({
	worksheets = [],
	showUser = false,
	showUpdatedAt = false,
	loading = false,
	selectable,
	gridSpace = 3,
}: Props) => {
	const handleSelectWorksheet = (worksheetId: string) => {
		if (!selectable) return;

		selectable.setSelected((prevSelected) =>
			prevSelected.includes(worksheetId)
				? prevSelected.filter((id) => id !== worksheetId)
				: [...prevSelected, worksheetId]
		);
	};

	if (loading) {
		return <LoadingSpinner />;
	}

	if (worksheets.length === 0) {
		return (
			<Box textAlign="center" py={3}>
				<Typography variant="h5">No Worksheets Found</Typography>
			</Box>
		);
	}

	return (
		<Box>
			<Grid container>
				{worksheets.map((worksheet) => (
					<Grid size={{ xs: 12, sm: 4, md: gridSpace }} p={0.5} key={worksheet._id}>
						<WorksheetCard
							worksheet={worksheet}
							showInstructor={showUser}
							showUpdatedAt={showUpdatedAt}
							selected={selectable?.selected.includes(worksheet._id)}
							onClick={
								selectable?.canSelect
									? () => handleSelectWorksheet(worksheet._id)
									: undefined
							}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default WorksheetGrid;
