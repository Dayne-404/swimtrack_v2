import { useLayoutEffect, useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { apiRequest } from '../common/services/apiRequest';
import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [loginError, setLoginError] = useState<string>('');
	const { setUser } = useUser();

	const applyAuthData = useCallback(
		(data: { accessToken: string; user: User }) => {
			if (!data?.accessToken || !data?.user) {
				throw new Error('Missing access token or user data');
			}

			const payload = jwtDecode(data.accessToken) as { userId: string; role: string };

			if (!payload.userId || !payload.role) {
				throw new Error('Invalid token payload');
			}

			setAccessToken(data.accessToken);
			setUser({ ...data.user, _id: payload.userId, role: payload.role });
		},
		[setUser]
	);

	const login = async (email: string, password: string): Promise<boolean> => {
		console.log('Logging in...');
		setLoading(true);
		setLoginError('');

		try {
			const res = await apiRequest({
				method: 'POST',
				endpoint: '/auth/login',
				body: JSON.stringify({ email, password }),
			});

			const data = res as { accessToken: string; user: User };
			applyAuthData(data);
			return true;
		} catch (error) {
			console.error('Login failed:', error);
			setAccessToken(null);
			setUser(null);

			const errorMsg = error instanceof Error ? error.message : String(error);
			setLoginError(errorMsg);

			return false;
		} finally {
			setLoading(false);
		}
	};

	const logout = async (): Promise<boolean> => {
		console.log('Logging out...');
		try {
			await apiRequest({
				method: 'POST',
				endpoint: '/auth/logout',
			});

			console.log('Logout successful');
		} catch (error) {
			console.error('Logout failed:', error);
			return false;
		}

		setAccessToken(null);
		setUser(null);
		return true;
	};

	useLayoutEffect(() => {
		const restoreAccessToken = async () => {
			console.log('Restoring access token...');
			try {
				const res = await apiRequest({
					endpoint: '/auth/refresh',
					method: 'POST',
				});

				const data = res as { accessToken: string; user: User };
				applyAuthData(data);
			} catch (error) {
				console.error('Failed to restore access token:', error);
				setAccessToken(null);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		restoreAccessToken();
	}, [applyAuthData, setUser]);

	return (
		<AuthContext.Provider
			value={{ accessToken, setAccessToken, login, loginError, logout, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};
