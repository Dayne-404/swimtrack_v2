import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
import { fetchWorksheet, updateWorksheet } from '../../../common/services/apiWorksheet';
import { useAuth } from '../../../contexts/AuthContext';
import WorksheetToolbar from './WorksheetToolbar';
import WorksheetDetailsHeader from './WorksheetDetailsHeader';
import WorksheetDetailsFooter from './WorksheetDetailsFooter';
import WorksheetBody from './WorksheetBody';
import { LEVELS } from '../../../common/constants/levels';

interface Props {
	propWorksheetId?: string;
}

const resetStudentsSkillsArray = (worksheet: Worksheet): Worksheet => {
	if (
		worksheet.students.length === 0 ||
		worksheet.students.some((s) => s.skills.length !== LEVELS[worksheet.level].skills.length)
	) {
		const skillCount = LEVELS[worksheet.level].skills.length;

		worksheet.students = worksheet.students.map((student) => ({
			...student,
			skills: Array(skillCount).fill(false),
		}));
	}

	return worksheet;
};

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
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!accessToken || !worksheetId) return;

		const getWorksheet = async () => {
			try {
				const worksheet: Worksheet = await fetchWorksheet(worksheetId, accessToken);

				//TODO This is a temporary fix to ensure all students have the correct number of skills.
				//TODO It should be removed when all worksheets are updated to have the correct skills.
				const formattedWorksheet = resetStudentsSkillsArray(worksheet);

				setEditableWorksheet(formattedWorksheet);
				initialWorksheetRef.current = formattedWorksheet;
			} catch (error) {
				console.log('Failed to fetch worksheet', error);
			}
		};

		getWorksheet();
	}, [worksheetId, accessToken]);

	const saveEdits = async () => {
		if (!editableWorksheet || !accessToken) return;

		try {
			setLoading(true);
			const updatedWorksheet = await updateWorksheet(editableWorksheet, accessToken);
			console.log('updatedWorksheet:', updatedWorksheet);
			setEditableWorksheet(updatedWorksheet);
			initialWorksheetRef.current = updatedWorksheet;
			setEditing(false);
		} catch (error) {
			console.error('Failed to save worksheet edits:', error);
		} finally {
			setLoading(false);
		}
	};

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
					Getting worksheet details...
				</Stack>
			) : (
				<>
					<WorksheetDetailsHeader
						worksheet={editableWorksheet}
						setWorksheet={setEditableWorksheet}
						disabled={!editing || loading}
					/>
					<WorksheetBody
						worksheet={editableWorksheet}
						setWorksheet={setEditableWorksheet}
						disabled={!editing || loading}
					/>
					<WorksheetDetailsFooter
						loading={loading}
						onSave={saveEdits}
						disabled={!editing}
					/>
				</>
			)}
		</Stack>
	);
};

export default WorksheetDetails;
