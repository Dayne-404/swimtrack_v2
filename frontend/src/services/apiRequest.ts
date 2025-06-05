const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
import { getToken } from './getToken';
interface Props {
	endpoint: string;
	method?: string;
	params?: URLSearchParams;
	body?: string;
	isTokenRequired?: boolean;
	retry?: boolean;
}

export const apiRequest = async ({
	endpoint,
	method = 'GET',
	params,
	body,
	isTokenRequired = true,
}: Props): Promise<unknown> => {
	const accessToken = isTokenRequired ? getToken() : null;


	let uri = `${API_BASE_URL}/api${endpoint}`;
	if (params) uri += `?${params.toString()}`;

	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(accessToken && { Authorization: `Bearer ${accessToken}` }),
		},
		...(body && { body }),
		credentials: 'include',
	};

	const res = await fetch(uri, options);

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({}));
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}

	return res.json();
};
