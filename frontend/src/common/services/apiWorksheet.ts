import { apiRequest } from './apiRequest';

interface fetchWorksheetsProps {
	limit?: number;
	skip?: number;
	filter?: URLSearchParams;
	sort?: URLSearchParams;
	specific?: boolean;
	accessToken: string;
}

export const fetchWorksheets = async ({
	filter,
	sort,
	limit,
	skip,
	specific = false,
	accessToken,
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

export const fetchWorksheet = async (
	worksheetId: string,
	accessToken: string
): Promise<Worksheet> => {
	const res = (await apiRequest({
		endpoint: `/worksheets/${worksheetId}`,
		accessToken: accessToken,
	})) as { worksheet: Worksheet };
	return res.worksheet;
};

export const updateWorksheet = async (
	worksheet: Worksheet,
	accessToken: string
): Promise<Worksheet> => {
	const res = await apiRequest({
		endpoint: `/worksheets/${worksheet._id}`,
		method: 'PUT',
		body: JSON.stringify(worksheet),
		accessToken: accessToken,
	});
	console.log(res);
	return res as Worksheet;
};
