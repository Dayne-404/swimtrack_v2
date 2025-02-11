import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import argon2 from 'argon2';
import User from '../models/User.model';
import NAMES from '../config/names';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
	console.error(
		'MONGO_URI is not set. Please provide a valid MongoDB URI in the enviornment variables.'
	);
	process.exit(1);
}

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('Connected to Database');
	} catch (error) {
		console.error('Database connection error:', error);
		process.exit(1);
	}
};

const seedUsers = async () => {
	try {
		await connectDB();

		const users = await Promise.all(NAMES.map(async (fullName) => {
			const [firstName, lastName] = fullName.split(' ');
			const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
			const hashedPassword = await argon2.hash('password');

			return {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: hashedPassword,
			};
		}));

        await User.insertMany(users);
		console.log(`Sucessfully inserted ${users.length} users`);
		process.exit();
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}

        process.exit(1);
	}
};

seedUsers();
