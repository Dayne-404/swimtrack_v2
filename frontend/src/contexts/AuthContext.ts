import { createContext, useContext } from 'react';

interface AuthContextType {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
	loginError: string;
	loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
