import { Request, Response, NextFunction } from 'express';
import User, { UserDocument } from '../models/User.model';
import argon2 from 'argon2';
import { isAuthorized } from '../utils/authentication';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	console.log('\nCreating new user');

	const newUser: UserDocument = req.body;

	try {
		const userExists = await User.findOne({ email: newUser.email });

		if (userExists) {
			res.status(400).json({ message: 'User already exists', type: 0 });
			return;
		}

		const hashedPassword = await argon2.hash(newUser.password);

		const newUserDocument = await User.create({
			...newUser,
			password: hashedPassword,
		});

		console.log('Sucessfully created new user with details');
		console.log('-----------------------------------------');
		console.log(`${newUserDocument.firstName}, ${newUserDocument.lastName || ''}`);
		console.log(`Email: ${newUserDocument.email}`);
		console.log(`HashedPassword: ${newUserDocument.password}`);
		console.log(`Role: ${newUserDocument.role}`);
		console.log(`Active: ${newUserDocument.active}`);
		console.log(`AvatarColor: ${newUserDocument.avatarColor}`);
		console.log('-----------------------------------------');

		res.status(200).json(newUserDocument);
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const userId = req.user?._id; //Id of the user making the request
	const { targetUserId } = req.params; //Id that is passed through params
	const updates = req.body;

	try {
		const userToUpdate = await User.findById(targetUserId ? targetUserId : userId);

		if (!userToUpdate) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		//If targetId and userId are the same, or the user is an admin or supervisor, the request is authorized
		if (!isAuthorized(req, targetUserId, userToUpdate.role)) {
			res.status(403).json({
				message: 'You are not authorized to change the email of this account',
			});
			return;
		}

		if (updates.password) {
			updates.password = await argon2.hash(updates.password);
		}

		if (updates.role && req.user?.role !== 'admin') {
			updates.role.omit();
		}

		Object.assign(userToUpdate, updates);
		await userToUpdate.save();

		res.status(200).json({ message: 'User updated successfully' });
	} catch (error) {
		next(error);
	}
};

export const searchForUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const { limit = 20, search = '' } = req.query;

	let searchQuery = {};

	if (search) {
		const searchTerms = search
			.toString()
			.split(' ')
			.filter((term) => term.trim() !== '');

		searchQuery = {
			$and: searchTerms.map((term) => ({
				$or: [
					{ firstName: { $regex: term, $options: 'i' } },
					{ lastName: { $regex: term, $options: 'i' } },
					{ email: { $regex: term, $options: 'i' } },
				],
			})),
		};
	}

	try {
		const users = await User.find(searchQuery).limit(Number(limit)).select('-password');
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const { targetUserId } = req.params;

	try {
		const user = await User.findById(targetUserId).select('-password');

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
