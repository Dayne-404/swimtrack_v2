import { useState } from 'react';
import type { ReactNode } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
