import { useContext, createContext } from 'react';
interface UserContextType {
	user: User | null;
	setUser: (newUser: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
