import { Stack, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import BackButton from '../../inputs/buttons/BackButton';
import { useUser } from '../../../contexts/UserContext';
import DeleteButton from '../../inputs/buttons/DeleteButton';
import { WORKSHEET_DATA } from '../../../common/constants/worksheetData';

interface Props {
	worksheet: Worksheet | null; //This is the user ID of the worksheet owner
	editing?: { isEditing: boolean; set: (editing: boolean) => void };
	loading?: { isLoading: boolean; set: (loading: boolean) => void };
}

const WorksheetToolbar = ({ worksheet, editing, loading }: Props) => {
	const { user } = useUser();

	const handleDelete = () => {
		if (!worksheet?._id) return;

		console.log(`Deleting worksheet with ID: ${worksheet._id}`);
		// Navigate back after successful deletion
		loading?.set(true);
		loading?.set(false);
	};

	const displayEditingOptions: boolean =
		(worksheet?.user && worksheet.user._id === user?._id) ||
		user?.role === 'admin' ||
		user?.role === 'supervisor';

	return (
		<Stack direction="row" alignItems="center" justifyContent="space-between">
			<BackButton />

			{displayEditingOptions && worksheet && (
				<Stack direction="row" spacing={1}>
					<Button
						color="primary"
						variant="outlined"
						onClick={() => editing && editing.set(!editing.isEditing)}
						startIcon={editing && <DoNotDisturbIcon />}
					>
						{!editing ? <EditIcon /> : 'Cancel'}
					</Button>

					<DeleteButton loading={loading?.isLoading} handleDelete={handleDelete}>
						<Typography>
							You will be deleting this{' '}
							{worksheet?.level || worksheet?.level === 0
								? WORKSHEET_DATA.level[worksheet.level]
								: 'undefined'}{' '}
							worksheet with {worksheet.students.length ?? 0} student
							{'(s)'}
						</Typography>
					</DeleteButton>
				</Stack>
			)}
		</Stack>
	);
};

export default WorksheetToolbar;
