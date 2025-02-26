import { NextFunction, Request, Response } from 'express';
import Group from '../models/Group.model';
import User from '../models/User.model';
import Worksheet from '../models/Worksheet.model';

export const createGroup = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const userId = req.user?._id; //Id of the user making the request
	const { targetUserId } = req.params; //Id that is passed through params
	const { name, worksheets } = req.body;

	if (targetUserId && (userId !== targetUserId || req.user?.role !== 'admin')) {
		res.status(403).json({ message: 'You are not authorized to create a group for this user' });
		return;
	}

	try {
		const group = await Group.create({
			user: targetUserId ? targetUserId : userId,
			name: name,
			worksheets: worksheets,
		});

		res.status(200).json(group);
	} catch (error) {
		next(error);
	}
};

export const getGroups = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const userId = req.user?._id;
	const { targetUserId } = req.params;
	const { limit = 20, skip = 0, sort = '-createdAt', search = '' } = req.query;

	let filterQuery: any = targetUserId ? { user: targetUserId } : { user: userId };

	if (search) {
		filterQuery = {
			...filterQuery,
			$or: [{ name: { $regex: search, $options: 'i' } }],
		};
	}

	const sortString = sort as string;
	const order = sortString.startsWith('-') ? -1 : 1;
	const key = sortString.replace(/^-/, '');
	const sortQuery: any = { [key]: order };

	try {
		const groups = await Group.find(filterQuery)
			.sort(sortQuery)
			.skip(skip as number)
			.limit(limit as number);

		const totalCount = await Group.countDocuments(filterQuery);

		res.status(200).json({ groups, totalCount });
	} catch (error) {
		next(error);
	}
};

export const getWorksheetsByGroupId = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const groupId = req.params.groupId;

	try {
		const group = await Group.findById(groupId);

		if (!group) {
			throw new Error(`Group with ID ${groupId} not found`);
		}

		res.status(200).json(group);
	} catch (error) {
		next(error);
	}
};

//TODO Make sure that all the worksheets belong to the user
//UPDATE Maybe not.. I make sure that a user can only EDIT their own worksheets
export const addWorksheetsToGroups = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const { worksheetIds, groupIds } = req.body;

	if (!Array.isArray(worksheetIds) || !Array.isArray(groupIds)) {
		return res.status(400).json({ message: 'worksheetIds and groupIds must be arrays' });
	}

	try {
		// Validate that all worksheet IDs exist
		const worksheets = await Worksheet.find({ _id: { $in: worksheetIds } });
		if (worksheets.length !== worksheetIds.length) {
			return res.status(404).json({ message: 'One or more worksheet IDs are invalid' });
		}

		// Add each worksheet to each group
		const updatePromises = groupIds.map(async (groupId) => {
			const group = await Group.findById(groupId);
			if (!group) {
				return res.status(404).json({ message: `Group with ID ${groupId} not found` });
			} else if (String(group.user) !== String(req.user?._id)) {
				return res
					.status(403)
					.json({
						message: `You are not authorized to add worksheets to group with ID ${groupId}`,
					});
			}

			worksheetIds.forEach((worksheetId) => {
				if (!group.worksheets.includes(worksheetId)) {
					group.worksheets.push(worksheetId);
				}
			});

			return group.save();
		});

		await Promise.all(updatePromises);

		res.status(200).json({ message: 'Worksheets added to groups successfully' });
	} catch (error) {
		next(error);
	}
};

export const removeWorksheetsFromGroup = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const id = req.params.groupId;
	const { worksheetIds } = req.body;

	let worksheetArray: string[] = [];
	if (!Array.isArray(worksheetIds)) {
		worksheetArray = [String(worksheetIds)];
	}

	try {
		const group = await Group.findById(id);

		if (!group) {
			return res.status(404).json({ message: `Group with ID ${id} not found` });
		}

		if (String(group.user) !== String(req.user?._id)) {
			return res
				.status(403)
				.json({
					message: `You are not authorized to remove worksheets from group with ID ${id}`,
				});
		}

		worksheetArray.forEach((worksheetId) => {
			group.worksheets = group.worksheets.filter((id) => String(id) !== worksheetId);
		});

		await group.save();

		res.status(200).json({ message: 'Worksheets removed from group successfully' });
	} catch (error) {
		next(error);
	}
};

export const deleteGroupById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const userId = req.user?._id;
	const { id } = req.params;

	try {
		const group = await Group.findById(id);

		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}

		if (String(group.user) !== String(userId) || req.user?.role !== 'admin') {
			return res.status(403).json({ message: 'You are not authorized to delete this group' });
		}

		await group.deleteOne();

		res.status(200).json({ messaage: 'Group deleted sucessfully' });
	} catch (error) {
		next(error);
	}
};
