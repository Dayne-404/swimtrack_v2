// import { Request, Response } from 'express';
// import Group, { GroupDocument } from '../models/Group.model';

// export const createGroup = async (req: Request, res: Response): Promise<any> => {
// 	try {
// 		const worksheet = await Worksheet.create(req.body);
// 		res.status(200).json({
// 			worksheet,
// 		});
// 	} catch (error) {
// 		if (error instanceof Error) {
// 			console.error(error.message);
// 			res.status(500).json({ message: error.message });
// 		} else {
// 			console.error('An unknown error occurred');
// 			res.status(500).json({ message: 'An unknown error occurred' });
// 		}
// 	}
// };
