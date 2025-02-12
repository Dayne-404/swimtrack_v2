import { Request, Response } from 'express';
import User, { UserDocument } from '../models/User.model';
import argon2 from 'argon2';

export const createUser = async (req: Request, res: Response): Promise<any> => {
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
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).json({ message: error.message });
		} else {
			console.error('An unknown error occurred');
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};


