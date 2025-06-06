import { Box, Grid, Typography } from '@mui/material';
import WorksheetCard from './WorksheetCard';
import LoadingSpinner from './LoadingSpinner';

interface Props {
	worksheets?: Worksheet[];
	showInstructor?: boolean;
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
	showInstructor = false,
	showUpdatedAt = false,
	loading = false,
	selectable,
	gridSpace = 3,
	alignItems,
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
		<Box width="100%" alignItems={alignItems && alignItems} display="flex">
			<Grid container>
				{worksheets.map((worksheet) => (
					<Grid size={{ xs: 12, sm: 6, md: gridSpace }} spacing={0.5} key={worksheet._id}>
						<WorksheetCard
							worksheet={worksheet}
							showInstructor={showInstructor}
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
