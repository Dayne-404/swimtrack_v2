import { getToken } from './getToken';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface Props {
	endpoint: string;
	method?: string;
	params?: URLSearchParams;
	body?: string;
	isTokenRequired?: boolean;
}

export const apiRequest = async ({
	endpoint,
	method = 'GET',
	params,
	body,
	isTokenRequired = true,
}: Props): Promise<unknown> => {
	let uri = `${API_BASE_URL}/api${endpoint}`;

	if (params) uri += `?${params.toString()}`;

	const token = isTokenRequired ? getToken() : null;

	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` }),
		},
		...(body && { body: body }),
	};

	const res = await fetch(uri, options);
	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}

	return res.json();
};