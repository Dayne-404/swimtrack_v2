import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchWorksheet } from '../../../common/services/apiWorksheet';
import { useAuth } from '../../../contexts/AuthContext';
import WorksheetToolbar from './WorksheetToolbar';
import WorksheetDetailsHeader from './WorksheetDetailsHeader';

interface Props {
	propWorksheetId?: string;
}

const WorksheetDetails = ({ propWorksheetId }: Props) => {
	const { paramWorksheetId } = useParams();
	const worksheetId: string | null = propWorksheetId ?? paramWorksheetId ?? null;
	const { accessToken } = useAuth();
	const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
	const [originalWorksheet, setOriginalWorksheet] = useState<Worksheet | null>(worksheet);

	useEffect(() => {
		const getWorksheet = async () => {
			if (!accessToken || !worksheetId) return;

			try {
				if (!worksheetId) return;
				const data: Worksheet = await fetchWorksheet(worksheetId as string, accessToken);
				console.log('Fetched worksheet:', data);
				
				setWorksheet(data);
				setOriginalWorksheet(data);
			} catch (error) {
				console.log('Failed to fetch worksheet', error);
			}
		};

		getWorksheet();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [worksheetId]);

	return (
		<Stack width="100%" spacing={1.5}>
			<WorksheetToolbar worksheet={worksheet} />

			{!worksheet ? (
				<Stack width="100%" height="100%" justifyContent="center" alignItems="center">
					Loading...
				</Stack>
			) : (
				<WorksheetDetailsHeader worksheet={worksheet} setWorksheet={setWorksheet} />
			)}
		</Stack>
	);
};

export default WorksheetDetails;
