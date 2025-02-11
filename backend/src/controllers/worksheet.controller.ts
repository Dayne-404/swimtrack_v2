import { Request, Response } from 'express';
import Worksheet from '../models/Worksheet.model';
import User from '../models/User.model';
import buildFiltersQuery from '../utils/buildFilterQuery';
import buildSortQuery from '../utils/buildSortQuery';

export const findWorksheet = async (req: Request, res: Response): Promise<any> => {
	const { limit = 20, skip = 0, sort = [], ...filters } = req.query;
	const isSpecific = 'specific' in req.query;

	try {
		const filterQuery =
			isSpecific && req.user?._id
				? buildFiltersQuery(filters, req.user._id)
				: buildFiltersQuery(filters);

		const sortQuery = buildSortQuery(sort as string[]);

		console.log('Filter Query: ', filterQuery);
		console.log('Sort Query: ', sortQuery);

		const worksheets = await Worksheet.find(filterQuery)
			.sort(sortQuery as { [key: string]: 1 | -1 })
			.skip(parseInt(skip as string))
			.limit(parseInt(limit as string))
			.populate('user', '_id firstName lastName');

		const totalCount = await Worksheet.countDocuments(filterQuery);

		res.status(200).json({worksheets, totalCount});
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		} else {
			console.error('An unknown error occurred');
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};

export const createWorksheet = async (req: Request, res: Response): Promise<any> => {
	try {
		const worksheet = await Worksheet.create(req.body);
		res.status(200).json({
			worksheet,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		} else {
			console.error('An unknown error occurred');
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};
