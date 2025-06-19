import { useState } from 'react';
import type { ReactNode } from 'react';
import SnackbarAlert from '../components/common/SnackbarAlert';
import { AlertContext } from '../contexts/AlertContext';

interface Alert {
	open: boolean;
	message: string;
	severity: Severity;
}

export const AlertProvider = ({ children }: { children: ReactNode }) => {
	const [alert, setAlert] = useState<Alert>({
		open: false,
		message: '',
		severity: 'success',
	});

	const showAlert = (message: string, severity: Severity = 'success') => {
		setAlert({ open: true, message, severity });
	};

    const hideAlert = () => {
        setAlert({ open: false, message: '', severity: 'success'})
    }

	return (
		<AlertContext.Provider value={{ showAlert, hideAlert }}>
			<SnackbarAlert alert={alert} setAlert={setAlert} />
			{children}
		</AlertContext.Provider>
	);
};
