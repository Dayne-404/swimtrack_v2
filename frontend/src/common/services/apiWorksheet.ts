import { apiRequest } from './apiRequest';

interface fetchWorksheetsProps {
	instructorId?: string;
	limit?: number;
	skip?: number;
	filter?: URLSearchParams;
	sort?: URLSearchParams;
	specific?: boolean;
    accessToken: string
}

export const fetchWorksheets = async ({
	filter,
	sort,
	limit,
	skip,
	specific = false,
    accessToken
}: fetchWorksheetsProps) => {
	const params = new URLSearchParams();
	
	if (filter) {
		for (const [key, value] of filter.entries()) {
			params.append(key, value);
		}
	}

	if (sort) {
		for (const [key, value] of sort.entries()) {
			params.append(key, value);
		}
	}

	if (limit) params.append('limit', String(limit));
	if (skip) params.append('skip', String(skip));
	if (specific) params.append('specific', 'true');

	console.log('fetchWorksheets params:', params.toString());

	return apiRequest({
		endpoint: '/worksheets',
		params: params,
		accessToken: accessToken,
	});
};
