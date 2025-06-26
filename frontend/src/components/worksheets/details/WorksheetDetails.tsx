import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useApi } from '../../../common/hooks/useApi';
import WorksheetToolbar from './WorksheetToolbar';
import WorksheetDetailsHeader from './WorksheetDetailsHeader';
import WorksheetDetailsFooter from './WorksheetDetailsFooter';
import WorksheetBody from './WorksheetBody';
import { LEVELS } from '../../../common/constants/levels';
import { useAlert } from '../../../contexts/AlertContext';

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
	const { apiRequest } = useApi();
	const { paramWorksheetId } = useParams();
	const { accessToken } = useAuth();
	const { showAlert } = useAlert();

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
				const worksheet: { worksheet: Worksheet } = (await apiRequest({
					endpoint: `/worksheets/${worksheetId}`,
				})) as { worksheet: Worksheet };

				//TODO This is a temporary fix to ensure all students have the correct number of skills.
				//TODO It should be removed when all worksheets are updated to have the correct skills.
				const formattedWorksheet = resetStudentsSkillsArray(worksheet.worksheet);

				setEditableWorksheet(formattedWorksheet);
				initialWorksheetRef.current = formattedWorksheet;
			} catch (error) {
				console.log('Failed to fetch worksheet', error);
			}
		};

		getWorksheet();
	}, [worksheetId, accessToken, apiRequest]); //TODO look at dependencies... I dont think apiRequest ever has to be in the array

	const saveEdits = async () => {
		if (!editableWorksheet) return;

		try {
			setLoading(true);
			const updatedWorksheet: Worksheet = (await apiRequest({
				endpoint: `/worksheets/${editableWorksheet._id}`,
				method: 'PUT',
				body: JSON.stringify(editableWorksheet),
			})) as Worksheet;
			console.log('updatedWorksheet:', updatedWorksheet);
			setEditableWorksheet(updatedWorksheet);
			initialWorksheetRef.current = updatedWorksheet;
			setEditing(false);
			showAlert('Worksheet saved successfully!');
		} catch (error) {
			console.error('Failed to save worksheet edits:', error);
			showAlert('Failed to save worksheet edits', 'error');
		} finally {
			setLoading(false);
		}
	};

	const addStudent = () => {
		if (!editableWorksheet) return;

		const skillCount = LEVELS[editableWorksheet.level].skills.length;

		const newStudent: Student = {
			name: '',
			skills: Array(skillCount).fill(false),
			passed: false,
		};

		setEditableWorksheet((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				students: [...prev.students, newStudent],
			};
		});
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
						isEditing={editing}
					/>
					<WorksheetDetailsFooter
						loading={loading}
						onAddStudent={addStudent}
						onSave={saveEdits}
						disabled={!editing}
					/>
				</>
			)}
		</Stack>
	);
};

export default WorksheetDetails;
