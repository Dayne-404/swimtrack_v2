import { Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from '../../inputs/buttons/LoadingButton';

interface Props {
	loading?: boolean;
	disabled?: boolean;
	onSave?: () => void;
}

const WorksheetFooter = ({
	loading = false,
	disabled = false,
	onSave = () => {},
}: Props) => {
	return (
		<Grid container alignItems="center" justifyContent="right" rowSpacing={1}>
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

export default WorksheetFooter;
