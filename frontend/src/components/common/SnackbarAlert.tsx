import { Alert, Snackbar } from '@mui/material';
import type { SnackbarCloseReason } from '@mui/material';

interface SnackbarAlertProps {
	alert: Alert;
	autoHideDuration?: number;
	setAlert: React.Dispatch<React.SetStateAction<Alert>>;
}

const SnackbarAlert = ({ alert, setAlert, autoHideDuration = 6000 }: SnackbarAlertProps) => {
	const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlert((prevValues) => ({
			...prevValues,
			open: false,
		}));
	};
	return (
		<Snackbar
			open={alert.open}
			onClose={handleClose}
			autoHideDuration={autoHideDuration}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert variant="filled" severity={alert.severity} sx={{ width: '100%' }}>
				{alert.message}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarAlert;
