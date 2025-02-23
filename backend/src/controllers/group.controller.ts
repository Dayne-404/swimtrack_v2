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
	const targetId = req.params.id; //Id that is passed through params
	const { name, worksheets } = req.body;

	if (targetId && (userId !== targetId || req.user?.role !== 'admin')) {
        res.status(403).json({ message: 'You are not authorized to create a group for this user' });
		return;
	}

	try {
		const group = await Group.create({
			user: targetId ? targetId : userId,
			name: name,
			worksheets: worksheets,
		});

		res.status(200).json(group);
	} catch (error) {
		next(error);
	}
};

//TODO
export const getGroups = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = req.user?._id;
    const targetId = req.params.id;
    const { limit = 20, skip = 0, sort = ['-createdAt'], search = '' } = req.query;

    let searchQuery: any = targetId ? { user: targetId } : { user: userId };
    
    if(search) {
        searchQuery = {
            ...searchQuery,
            $or: [{ name: { $regex: search, $options: 'i' } }],
        };
    }



};

export const getWorksheetsByGroupId = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
    const groupId = req.params.id;

    try {
        const group = await Group.findById(groupId);

        if(!group) {
            throw new Error(`Group with ID ${groupId} not found`);
        }

        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
};

//TODO Make sure that all the worksheets belong to the user
export const addWorksheetToGroups = async (
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
                throw new Error(`Group with ID ${groupId} not found`);
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
