import { apiRequest } from './apiRequest';
import { buildQueryParams } from '../utils/buildQueryParams';

interface fetchWorksheetsProps {
	instructorId?: string;
	limit?: number;
	skip?: number;
	filters?: Record<string, (number | string)[]>;
	sorting?: Record<string, number>;
	specific?: boolean;
    accessToken: string
}

export const fetchWorksheets = async ({
	limit,
	skip,
	filters,
	sorting,
	specific = false,
    accessToken
}: fetchWorksheetsProps) => {
	const params = buildQueryParams(filters, sorting);
	if (limit) params.append('limit', String(limit));
	if (skip) params.append('skip', String(skip));
	if (specific) params.append('specific', 'true');

	return apiRequest({
		endpoint: '/worksheets',
		params: params,
		accessToken: accessToken,
	});
};
