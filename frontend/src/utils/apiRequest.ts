const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface Props {
	endpoint: string;
	method?: string;
	params?: URLSearchParams;
	body?: string;
	isTokenRequired?: boolean;
	retry?: boolean;
	accessToken?: string | null;
	setAccessToken?: (token: string | null) => void;
}

export const getNewAccessToken = async (setAccessToken?: (token: string | null) => void): Promise<string | null> => {
	console.log('Page reloaded, attempting to refresh access token...');
	
	const refreshToken = localStorage.getItem('refreshToken');
	if (!refreshToken) {
		redirectToLogin();
		return null;
	}

	try {
		const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refreshToken }),
		});

		if (!response.ok) {
			console.error('Refresh failed with status:', response.status);
			localStorage.removeItem('refreshToken');
			redirectToLogin();
			return null;
		}

		const data = await response.json();
		if (!data.accessToken) {
			throw new Error('No access token returned');
		}

		// Optionally set in context
		if (setAccessToken) {
			setAccessToken(data.accessToken);
		}

		return data.accessToken;
	} catch (err) {
		console.error('Failed to refresh access token:', err);
		localStorage.removeItem('refreshToken');
		redirectToLogin();
		return null;
	}
};

// Handles 401 responses by attempting to refresh the access token
const handleUnauthorized = async (originalRequest: Props): Promise<unknown> => {
	console.warn('Token expired or invalid, attempting to refresh...');

	const refreshToken = localStorage.getItem('refreshToken');
	if (!refreshToken) {
		redirectToLogin();
	}

	const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refreshToken }),
	});

	console.warn('Refresh response status:', refreshResponse.status);

	if (refreshResponse.ok) {
		const data = await refreshResponse.json();
		
		if(originalRequest.setAccessToken && data.accessToken) {
			originalRequest.setAccessToken(data.accessToken);
		} else {
			throw new Error('setAccessToken function is not provided or accessToken is missing');
		}
		
		// Retry original request with new access token
		return apiRequest({ ...originalRequest, accessToken: data.accessToken, retry: false });
	}

	// Failed to refresh
	console.error('Failed to refresh token, redirecting to login');
	localStorage.removeItem('refreshToken');
	redirectToLogin();
};

const redirectToLogin = () => {
	window.location.href = '/login';
	throw new Error('Session expired. Please log in again.');
};

export const apiRequest = async ({
	endpoint,
	method = 'GET',
	params,
	body,
	isTokenRequired = true,
	retry = true,
	accessToken,
	setAccessToken,
}: Props): Promise<unknown> => {
	let uri = `${API_BASE_URL}/api${endpoint}`;
	if (params) uri += `?${params.toString()}`;

	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(accessToken && { Authorization: `Bearer ${accessToken}` }),
		},
		...(body && { body }),
	};

	const res = await fetch(uri, options);

	if (res.status === 401 && isTokenRequired && retry) {
		return handleUnauthorized({ endpoint, method, params, body, isTokenRequired, accessToken, setAccessToken });
	}

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}

	return res.json();
};
