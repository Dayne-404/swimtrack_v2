import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface Params {
	filters?: URLSearchParams;
	sorting?: URLSearchParams;
	specific?: boolean;
	limit?: number;
	skip?: number;
}

interface Props {
	endpoint: string;
	method?: string;
	body?: string;
	params?: Params;
	withAuth?: boolean;
	accessToken?: string | null;
	onTokenRefresh?: (newToken: string, user: User) => void;
	onUnauthorized?: () => void;
}

const buildQueryParams = (params: Params): string => {
	const queryParams = new URLSearchParams();

	if (params.filters) {
		for (const [key, value] of params.filters.entries()) {
			queryParams.append(key, value);
		}
	}
	if (params.sorting) {
		for (const [key, value] of params.sorting.entries()) {
			queryParams.append(key, value);
		}
	}
	if (params.limit) queryParams.append('limit', String(params.limit));
	if (params.skip) queryParams.append('skip', String(params.skip));
	if (params.specific) queryParams.append('specific', 'true');

	return `?${queryParams.toString()}`;
};

export const apiRequest = async ({
	endpoint,
	method = 'GET',
	body,
	params = { specific: false },
	withAuth = true,
	accessToken,
	onTokenRefresh,
	onUnauthorized,
}: Props): Promise<unknown> => {
	let uri = `${API_BASE_URL}/api${endpoint}`;
	uri += buildQueryParams(params);

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (withAuth && accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}

	const options: RequestInit = {
		method,
		headers,
		...(body && { body }),
		credentials: 'include',
	};

	let res = await fetch(uri, options);

	if (res.status === 403 && withAuth) {
		console.log('Access token expired, attempting refresh');

		try {
			const refreshRes = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
				method: 'POST',
				credentials: 'include',
			});

			if (!refreshRes.ok) throw new Error('Refresh failed');

			const { accessToken: newToken, user } = await refreshRes.json();
			const payload = jwtDecode(newToken) as { userId: string; role: string };

			onTokenRefresh?.(newToken, { ...user, _id: payload.userId, role: payload.role });

			// retry request with new token
			headers.Authorization = `Bearer ${newToken}`;
			options.headers = headers;
			res = await fetch(uri, options);
		} catch {
			onUnauthorized?.();
			throw new Error('Unauthorized: token refresh failed');
		}
	}

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		const errorMessage = errorData.message || 'Request failed';
		throw new Error(errorMessage);
	}

	return res.json();
};
