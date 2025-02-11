import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../models/User.model';
import Worksheet from '../models/Worksheet.model';

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

const getRandomElement = (array: string[] | number[]): string | number => {
	return array[Math.floor(Math.random() * array.length)];
};

const generateStudents = (count: number): any[] => {
	if (count === 0) return [];

	const students = [];
	for (let i = 0; i < count; i++) {
		students.push({
			name: `name${i + 1}`,
			skills: [],
			passed: Math.random() > 0.5,
		});
	}
	return students;
};

const seedWorksheets = async (count: number) => {
	const startTime = Date.now();

	try {
		await connectDB();

		const users = await User.find({}, '_id');
		if (users.length === 0) {
			console.log('No users found in the database. Please add some first');
			process.exit(1);
		}

		const userIds = users.map((user) => user._id.toString());
		const worksheets = [];

		for (let i = 0; i < count; i++) {
			worksheets.push({
				user: getRandomElement(userIds),
				level: Math.floor(Math.random() * 20) + 1,
				year: Math.floor(Math.random() * (new Date().getFullYear() - 2000 + 1)) + 2000,
				session: getRandomElement([0, 1, 2, 3]),
				day: getRandomElement([0, 1, 2, 3, 4, 5, 6]),
				time: `${String(Math.floor(Math.random() * 14) + 10).padStart(2, '0')}:${String(
					Math.floor(Math.random() * 60)
				).padStart(2, '0')}`,
				location: getRandomElement([0, 1]),
				students: generateStudents(Math.floor(Math.random() * 5) + 1),
			});
		}

		await Worksheet.insertMany(worksheets);
		console.log(`Sucessfully inserted ${count} test worksheets!`);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('An unknown error occurred');
		}

		process.exit(1);
	}

	const endTime = Date.now();
	const elapsedTime = (endTime - startTime) / 1000;
	console.log(`\nSeed operation completed in ${elapsedTime.toFixed(2)} seconds.`);
	process.exit();
};

const countArg = process.argv[2];
const count = countArg ? parseInt(countArg, 10) : NaN;

if (isNaN(count) || count <= 0) {
	console.error('Please provide a valid number of documents to insert.');
	console.error('Example: npm run seed -- 50');
	process.exit(1);
}

seedWorksheets(count);
