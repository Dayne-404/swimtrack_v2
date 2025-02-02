import { Request, Response } from 'express';
import Worksheet, { WorksheetDocument } from '../models/Worksheet.model';
import buildFiltersQuery from '../utils/buildFilterQuery';

export const findWorksheet = async (req: Request, res: Response): Promise<any> => {
	const { specific = false, limit = 10, skip = 0, sort = [], ...filters } = req.query;
	console.log('FILTERS:', filters);
	console.log('SORTING', sort);

	try {
		//const filterQuery = buildFiltersQuery(filters, req.user, specific);
		
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
