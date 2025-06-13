import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
import { fetchWorksheet } from '../../../common/services/apiWorksheet';
import { useAuth } from '../../../contexts/AuthContext';
import WorksheetToolbar from './WorksheetToolbar';
import WorksheetDetailsHeader from './WorksheetDetailsHeader';
import WorksheetDetailsFooter from './WorksheetDetailsFooter';

interface Props {
	propWorksheetId?: string;
}

const WorksheetDetails = ({ propWorksheetId }: Props) => {
	const { paramWorksheetId } = useParams();
	const { accessToken } = useAuth();

	const worksheetId = useMemo(
		() => propWorksheetId ?? paramWorksheetId ?? null,
		[propWorksheetId, paramWorksheetId]
	);

	const [editableWorksheet, setEditableWorksheet] = useState<Worksheet | null>(null);
	const initialWorksheetRef = useRef<Worksheet | null>(null);

	const [editing, setEditing] = useState<boolean>(false);

	useEffect(() => {
		if (!accessToken || !worksheetId) return;

		const getWorksheet = async () => {
			try {
				const worksheet: Worksheet = await fetchWorksheet(worksheetId, accessToken);

				setEditableWorksheet(worksheet);
				initialWorksheetRef.current = worksheet;
			} catch (error) {
				console.log('Failed to fetch worksheet', error);
			}
		};

		getWorksheet();
	}, [worksheetId, accessToken]);

	const resetWorksheet = () => {
		if (initialWorksheetRef.current) {
			setEditableWorksheet(initialWorksheetRef.current);
		}
	};

	return (
		<Stack width="100%" spacing={1.5}>
			<WorksheetToolbar
				worksheet={editableWorksheet}
				editState={{
					isEditing: editing,
					setEditing: setEditing,
					onCancelEdit: resetWorksheet,
				}}
			/>

			{!editableWorksheet ? (
				<Stack width="100%" height="100%" justifyContent="center" alignItems="center">
					Loading...
				</Stack>
			) : (
				<>
					<WorksheetDetailsHeader
						worksheet={editableWorksheet}
						setWorksheet={setEditableWorksheet}
						disabled={!editing}
					/>

					<WorksheetDetailsFooter disabled={!editing} />
				</>
			)}
		</Stack>
	);
};

export default WorksheetDetails;
