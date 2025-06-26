import { Box, Grid, Typography, Pagination } from '@mui/material';
import WorksheetCard from './WorksheetCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useApi } from '../../common/hooks/useApi';

interface Props {
	params?: { filter: URLSearchParams; sort: URLSearchParams };
	specific?: boolean;
	showUser?: boolean;
	showUpdatedAt?: boolean;
	BottomButton?: React.ReactElement;
	gridSpace?: number;
	alignItems?: 'center';
	selectable?: {
		canSelect: boolean;
		selected: string[];
		setSelected: React.Dispatch<React.SetStateAction<string[]>>;
	};
}

const DEFAULT_LIMIT: number = 24;
const DEFAULT_SKIP: number = 0;

const WorksheetGrid = ({
	params,
	showUser = false,
	showUpdatedAt = false,
	selectable,
	specific = false,
	gridSpace = 3,
}: Props) => {
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [totalWorksheets, setTotalWorksheets] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);
	const [skip, setSkip] = useState<number>(DEFAULT_SKIP);

	const { apiRequest } = useApi();

	useEffect(() => {
		setSkip(0);
	}, [params?.filter, params?.sort]);

	useEffect(() => {
		const loadWorksheets = async () => {
			setLoading(true);
			try {
				const data = (await apiRequest({
					endpoint: '/worksheets',
					params: {
						limit: DEFAULT_LIMIT,
						skip: skip,
						specific: specific,
						filters: params?.filter,
						sorting: params?.sort,
					},
				})) as { worksheets: Worksheet[]; totalCount: number };

				setTotalWorksheets(data.totalCount);
				setWorksheets(data.worksheets);
			} catch (error) {
				const errorMesage =
					error instanceof Error ? error.message : 'An unkown error occurred';
				console.error(errorMesage);
				console.log(totalWorksheets);
			} finally {
				setLoading(false);
			}
		};

		loadWorksheets();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?.filter, params?.sort, skip]);

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

	if (worksheets.length === 0 && !loading) {
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
				{totalWorksheets > DEFAULT_LIMIT && (
					<Grid size={{ xs: 12 }} display={'flex'} justifyContent="center" mt={2}>
						<Pagination
							count={Math.ceil(totalWorksheets / DEFAULT_LIMIT)}
							page={Math.floor(skip / DEFAULT_LIMIT) + 1}
							onChange={(_e, value) => setSkip((value - 1) * DEFAULT_LIMIT)}
							color="primary"
							variant="outlined"
						/>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default WorksheetGrid;
