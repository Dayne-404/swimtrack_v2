import WorksheetGrid from '../components/misc/WorksheetGrid';
import { useState, useEffect } from 'react';
import { fetchWorksheets } from '../services/apiWorksheet';
import { useAuth } from '../contexts/AuthContext';

const LIMIT: number = 12;
const SKIP: number = 0;

const FinderPage = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [totalWorksheets, setTotalWorksheets] = useState<number>(0);

	const { accessToken } = useAuth();

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
	}, []);

	return <WorksheetGrid worksheets={worksheets} showInstructor loading={loading} />;
};

export default FinderPage;
