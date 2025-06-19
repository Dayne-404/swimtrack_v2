import { createContext, useContext } from 'react';

interface AlertContextType {
    hideAlert: () => void;
	showAlert: (message: string, severity?: Severity) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error('AlertContext must be used within a AlertProvider');
	}
	return context;
};
