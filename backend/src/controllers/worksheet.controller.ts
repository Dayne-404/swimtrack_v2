import { Request, Response, NextFunction } from 'express';
import Worksheet from '../models/Worksheet.model';
import buildFiltersQuery from '../utils/buildFilterQuery';
import buildSortQuery from '../utils/buildSortQuery';
import { isAuthorized } from '../utils/authentication';

export const getWorksheets = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
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
			.populate('user', '_id firstName lastName avatarColor role');

		const totalCount = await Worksheet.countDocuments(filterQuery);

		res.status(200).json({ worksheets, totalCount });
	} catch (error) {
		next(error);
	}
};

export const createWorksheet = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	try {
		const worksheet = await Worksheet.create(req.body);
		res.status(200).json({
			worksheet,
		});
	} catch (error) {
		next(error);
	}
};

export const getWorksheetById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const { worksheetId } = req.params;

	try {
		const worksheet = await Worksheet.findById(worksheetId).populate('user', '_id firstName lastName avatarColor role');
		if (!worksheet) {
			res.status(404).json({ message: 'Worksheet not found' });
			return;
		}

		console.log('Worksheet found:', worksheet);
		res.status(200).json({ worksheet });
	} catch (error) {
		next(error);
	}
};

export const updateWorksheet = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const { worksheetId } = req.params;

	try {
		const worksheet = await Worksheet.findById(worksheetId);
		if (!worksheet) {
			res.status(404).json({ message: 'Worksheet not found' });
			return;
		}

		if (!isAuthorized(req, String(worksheet.user))) {
			res.status(403).json({ message: 'You are not authorized to update this worksheet' });
			return;
		}

		const updatedWorksheet = await Worksheet.findByIdAndUpdate(worksheetId, req.body, { new: true });

		res.status(200).json(updatedWorksheet);
	} catch (error) {
		next(error);
	}
};

export const deleteWorksheet = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const { worksheetId } = req.params;

	try {
		const worksheet = await Worksheet.findById(worksheetId);
		if (!worksheet) {
			res.status(404).json({ message: 'Worksheet not found' });
			return;
		}

		if (!isAuthorized(req, String(worksheet.user))) {
			res.status(403).json({ message: 'You are not authorized to delete this worksheet' });
			return;
		}

		await Worksheet.findByIdAndDelete(worksheetId);
		res.status(200).json({ message: 'Worksheet deleted successfully' });
	} catch (error) {
		next(error);
	}
};
