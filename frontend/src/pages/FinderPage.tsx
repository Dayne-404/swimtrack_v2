import { useState, useEffect } from 'react';
import { fetchWorksheets } from '../common/services/apiWorksheet';
import { useAuth } from '../contexts/AuthContext';
import { Stack } from '@mui/material';
import ContentHeader from '../components/common/ContentHeader';
import WorksheetList from '../components/worksheets/WorksheetList';
import { FilterProvider } from '../providers/FilterProvider';
import { SortingProvider } from '../providers/SortProvider';

const FinderPage = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [totalWorksheets, setTotalWorksheets] = useState<number>(0);

	const { accessToken } = useAuth();

	const LIMIT: number = 12;
	const SKIP: number = 0;

	useEffect(() => {
		const loadWorksheets = async () => {
			if (!accessToken) return;

			setLoading(true);
			try {
				const data = (await fetchWorksheets({
					limit: LIMIT,
					skip: SKIP,
					filters: {},
					sorting: {},
					specific: false,
					accessToken: accessToken,
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
	}, []);

	return (
		<Stack spacing={1} width="100%">
			<ContentHeader title="Finder" />
			<FilterProvider>
				<SortingProvider>
					<WorksheetList />
				</SortingProvider>
			</FilterProvider>
		</Stack>
	);
};

export default FinderPage;
