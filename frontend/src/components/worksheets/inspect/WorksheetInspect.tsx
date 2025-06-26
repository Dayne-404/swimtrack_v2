import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useApi } from '../../../common/hooks/useApi';
import WorksheetToolbar from './WorksheetToolbar';
import WorksheetHeader from './WorksheetHeader';
import WorksheetFooter from './WorksheetFooter';
import WorksheetBody from './WorksheetBody';
import { useAlert } from '../../../contexts/AlertContext';
import { extractFormData, resetStudentsSkillsArray } from '../../../common/utils/worksheet';

interface Props {
	propWorksheetId?: string;
}

const WorksheetInspect = ({ propWorksheetId }: Props) => {
	const { apiRequest } = useApi();
	const { paramWorksheetId } = useParams();
	const { accessToken } = useAuth();
	const { showAlert } = useAlert();

	const worksheetId = useMemo(
		() => propWorksheetId ?? paramWorksheetId ?? null,
		[propWorksheetId, paramWorksheetId]
	);

	const [userMeta, setUserMeta] = useState<User | null>(null);
	const [worksheetMeta, setWorksheetMeta] = useState<WorksheetFormData>({
		level: 0,
		session: 0,
		day: 0,
		location: 0,
		time: '',
		year: '',
	});
	const [students, setStudents] = useState<Student[]>([]);

	const initalRef = useRef<Worksheet | null>(null);

	const [editing, setEditing] = useState<boolean>(true);
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

				setUserMeta(formattedWorksheet.user);
				setWorksheetMeta(extractFormData(formattedWorksheet));
				setStudents(formattedWorksheet.students);

				initalRef.current = formattedWorksheet;
			} catch (error) {
				console.log('Failed to fetch worksheet', error);
			}
		};

		getWorksheet();
		//TODO fix api request
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [worksheetId, accessToken]); //TODO look at dependencies... I dont think apiRequest ever has to be in the array

	const saveEdits = async () => {
		if (!worksheetMeta) return;

		try {
			setLoading(true);
			const updatedWorksheet: Worksheet = (await apiRequest({
				endpoint: `/worksheets/${worksheetId}`,
				method: 'PUT',
				body: JSON.stringify({
					user: userMeta?._id, //TODO fix this
					...worksheetMeta, //TODO create a function to verify fields and then make sure they are the correct types before sending
					students,
				}),
			})) as Worksheet;

			setUserMeta(updatedWorksheet.user);
			setWorksheetMeta(extractFormData(updatedWorksheet));
			setStudents(updatedWorksheet.students);
			initalRef.current = updatedWorksheet;
			setEditing(false);
			showAlert('Worksheet saved successfully!');
		} catch (error) {
			console.error('Failed to save worksheet edits:', error);
			showAlert('Failed to save worksheet edits', 'error');
		} finally {
			setLoading(false);
		}
	};

	

	const resetWorksheet = () => {
		if (initalRef.current) {
			setUserMeta(initalRef.current.user);
			setWorksheetMeta(extractFormData(initalRef.current));
			setStudents(initalRef.current.students);
		}
	};

	return (
		<Stack width="100%" spacing={1.5} position='relative'>
			<WorksheetToolbar
				worksheet={initalRef.current}
				editState={{
					isEditing: editing,
					setEditing: setEditing,
					onCancelEdit: resetWorksheet,
				}}
			/>

			{!worksheetMeta || !userMeta ? (
				<Stack width="100%" height="100%" justifyContent="center" alignItems="center">
					Getting worksheet details...
				</Stack>
			) : (
				<>
					<WorksheetHeader
						worksheetForm={worksheetMeta}
						setWorksheetForm={setWorksheetMeta}
						worksheetUser={userMeta}
						setWorksheetUser={setUserMeta}
						setStudents={setStudents}
						disabled={!editing || loading}
					/>
					<WorksheetBody
						level={worksheetMeta.level}
						students={students}
						setStudents={setStudents}
						isEditing={editing}
					/>
					<WorksheetFooter
						loading={loading}
						onSave={saveEdits}
						disabled={!editing}
					/>
				</>
			)}
		</Stack>
	);
};

export default WorksheetInspect;
