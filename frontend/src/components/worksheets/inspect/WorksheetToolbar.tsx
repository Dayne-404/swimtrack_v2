import { Stack, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import BackButton from '../../inputs/buttons/BackButton';
import { useUser } from '../../../contexts/UserContext';
import DeleteButton from '../../inputs/buttons/DeleteButton';
import { WORKSHEET_DATA } from '../../../common/constants/worksheetData';
import { useState } from 'react';
import { useAlert } from '../../../contexts/AlertContext';
import { useApi } from '../../../common/hooks/useApi';
import { useNavigate } from 'react-router-dom';

interface Props {
	worksheet: Worksheet | null;
	editState: {
		isEditing: boolean;
		setEditing: (editing: boolean) => void;
	};
	// loadingState?: {
	// 	isLoading: boolean;
	// 	setLoading: (loading: boolean) => void;
	// };
}

const WorksheetToolbar = ({ worksheet, editState }: Props) => {
	const { user } = useUser();
	const { apiRequest } = useApi();
	const [loading, setLoading] = useState<boolean>(false);
	const { showAlert } = useAlert();
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const deleteWorksheet = async () => {
		if (!worksheet?._id) return false;

		try {
			setLoading(true);
			await apiRequest({
				endpoint: `/worksheets/${worksheet._id}`,
				method: 'DELETE',
			});
			showAlert('Worksheet deleted successfully!');

			navigate(-1);
		} catch (error) {
			setOpen(false);
			console.error('Failed to delete worksheet:', error);
			showAlert('Failed to delete worksheet', 'error');
		} finally {
			setOpen(false);
			setLoading(false);
		}
	};

	const isOwnedByUser =
		worksheet?.user?._id === user?._id || user?.role === 'admin' || user?.role === 'supervisor';

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
						onClick={() => editState.setEditing(!editState.isEditing)}
						startIcon={editState?.isEditing ? <DoNotDisturbIcon /> : <EditIcon />}
					>
						{editState?.isEditing ? 'Cancel' : 'Edit'}
					</Button>

					<DeleteButton
						loading={loading}
						open={open}
						setOpen={setOpen}
						handleDelete={deleteWorksheet}
					>
						<Typography textAlign="center">
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
