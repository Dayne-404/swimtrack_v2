// hooks/useApi.ts
import { useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import { apiRequest as baseRequest } from '../utils/createApiClient';

export const useApi = () => {
	const { accessToken, setAccessToken, logout } = useAuth();
	const { setUser } = useUser();

	const apiRequest = useCallback(
		async (
			config: Omit<
				Parameters<typeof baseRequest>[0],
				'accessToken' | 'onTokenRefresh' | 'onUnauthorized'
			>
		) => {
			return baseRequest({
				...config,
				accessToken,
				onTokenRefresh: (newToken, user) => {
					setAccessToken(newToken);
					setUser(user);
				},
				onUnauthorized: async () => {
					await logout();
				},
			});
		},
		[accessToken, setAccessToken, setUser, logout]
	);

	return { apiRequest };
};
