import { Button, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '../../inputs/buttons/LoadingButton';

interface Props {
	loading?: boolean;
	disabled?: boolean;
	onSave?: () => void;
	onAddStudent?: () => void;
}

const WorksheetDetailsFooter = ({
	loading = false,
	disabled = false,
	onSave = () => {},
	onAddStudent = () => {},
}: Props) => {
	return (
		<Grid container alignItems="center" justifyContent="space-between" rowSpacing={1}>
			<Grid size={{ xs: 12, md: 2 }}>
				<Button
					disabled={disabled || loading}
					variant="contained"
					onClick={onAddStudent}
					startIcon={<AddIcon />}
                    fullWidth
				>
					Add Student
				</Button>
			</Grid>
			<Grid size={{ xs: 12, md: 1 }} position="relative">
				<LoadingButton
					text="Save"
					onClick={onSave}
					startIcon={<CheckIcon />}
					loading={loading}
                    fullwidth
					disabled={disabled || loading}
				/>
			</Grid>
		</Grid>
	);
};

export default WorksheetDetailsFooter;
