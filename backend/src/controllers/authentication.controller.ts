import { Request, Response } from 'express';
import { Instructor } from '../models/Instructor.model';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	console.error(
		'JWT_SECRET is not set. Please provide a valid secret in the environment variables.'
	);
	process.exit(1);
}

export const login = async (req: Request, res: Response): Promise<void> => {
	console.log('\nUser attempting to login');

	const { email, password } = req.body;

	try {
		let instructor = await Instructor.findOne({ email });
		if (!instructor) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		const isMatch = await argon2.verify(instructor.password, password);
		if (!isMatch) {
			res.status(400).json({ message: 'Incorrect password' });
		}

		const token = jwt.sign({ id: instructor._id, role: instructor.role }, JWT_SECRET, {
			expiresIn: '1h',
		});

		res.status(200).json({ token: token });
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
