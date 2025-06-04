import { useLayoutEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useUser } from './UserContext';
import { apiRequest } from '../utils/apiRequest';
import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const { setUser } = useUser();

	useLayoutEffect(() => {
		console.log('Restoring access token...');

		const restoreAccessToken = async () => {
			try {
				const res = apiRequest({
					endpoint: '/auth/refresh',
					method: 'POST',
					isTokenRequired: false,
				});

				const data = (await res) as { accessToken: string; user: User };

				if (!data?.accessToken || !data?.user) {
					throw new Error('No access token / User received');
				}

				const payload = jwtDecode(data.accessToken) as { userId: string; role: string };

				if (!payload.role || !payload.userId) {
					throw new Error('Invalid access token payload');
				}

				setAccessToken(data.accessToken);
				setUser({ ...data.user, _id: payload.userId, role: payload.role });
			} catch (error) {
				console.error('Failed to restore access token:', error);

				setAccessToken(null);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		restoreAccessToken();
	}, [setUser]);

	return (
		<AuthContext.Provider value={{ accessToken, setAccessToken, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
