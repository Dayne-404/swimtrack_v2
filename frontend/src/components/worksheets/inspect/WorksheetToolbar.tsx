import { Stack, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import BackButton from '../../inputs/buttons/BackButton';
import { useUser } from '../../../contexts/UserContext';
import DeleteButton from '../../inputs/buttons/DeleteButton';
import { WORKSHEET_DATA } from '../../../common/constants/worksheetData';

interface Props {
	worksheet: Worksheet | null;
	editState?: {
		isEditing: boolean;
		setEditing: (editing: boolean) => void;
		onCancelEdit?: () => void;
	};
	loadingState?: {
		isLoading: boolean;
		setLoading: (loading: boolean) => void;
	};
}

const WorksheetToolbar = ({ worksheet, editState, loadingState }: Props) => {
	const { user } = useUser();

	const isOwnedByUser =
		worksheet?.user?._id === user?._id || user?.role === 'admin' || user?.role === 'supervisor';

	const handleEditToggle = () => {
		if (!editState) return;

		if (editState.isEditing) {
			editState.onCancelEdit?.();
		}
		editState.setEditing(!editState.isEditing);
	};

	const handleDelete = () => {
		if (!worksheet?._id || !loadingState) return;

		console.log(`Deleting worksheet with ID: ${worksheet._id}`);
		loadingState.setLoading(true);

		// Simulate deletion logic
		// TODO: Replace with actual delete API
		setTimeout(() => loadingState.setLoading(false), 500);
	};

	const getWorksheetLevelLabel = () => {
		if (worksheet?.level === 0 || worksheet?.level) {
			return WORKSHEET_DATA.level[worksheet.level] ?? 'Unknown';
		}
		return 'undefined';
	};

	return (
		<Stack direction="row" alignItems="center" justifyContent="space-between">
			<BackButton />

			{isOwnedByUser && worksheet && (
				<Stack direction="row" spacing={1}>
					<Button
						color="primary"
						variant="outlined"
						onClick={handleEditToggle}
						startIcon={editState?.isEditing ? <DoNotDisturbIcon /> : <EditIcon />}
					>
						{editState?.isEditing ? 'Cancel' : 'Edit'}
					</Button>

					<DeleteButton loading={loadingState?.isLoading} handleDelete={handleDelete}>
						<Typography textAlign='center'>
							You will be deleting this <strong>{getWorksheetLevelLabel()}</strong>{' '}
							worksheet with <strong>{worksheet.students?.length ?? 0}</strong>{' '}
							student(s).
						</Typography>
					</DeleteButton>
				</Stack>
			)}
		</Stack>
	);
};

export default WorksheetToolbar;
