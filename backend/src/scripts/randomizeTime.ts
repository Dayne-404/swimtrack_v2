// randomizeWorksheetTimes.js
import mongoose from 'mongoose';
import Worksheet from '../models/Worksheet.model';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
	console.error(
		'MONGO_URI is not set. Please provide a valid MongoDB URI in the enviornment variables.'
	);
	process.exit(1);
}

const generateRandomTime = (): string => {
	const hour = Math.floor(Math.random() * 24); // 0 to 23
	const minute = Math.random() < 0.5 ? '00' : '30';
	return hour.toString().padStart(2, '0') + minute;
};

const updateAllWorksheets = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('Connected to MongoDB');

		const worksheets = await Worksheet.find({});
		console.log(`Found ${worksheets.length} worksheets`);

		for (const worksheet of worksheets) {
			const newTime = generateRandomTime();
			worksheet.time = newTime;
			await worksheet.save();
			console.log(`Updated worksheet ${worksheet._id} -> ${newTime}`);
		}

		console.log('All worksheet times updated!');
		process.exit(0);
	} catch (err) {
		console.error('Error updating worksheets:', err);
		process.exit(1);
	}
};

updateAllWorksheets();
