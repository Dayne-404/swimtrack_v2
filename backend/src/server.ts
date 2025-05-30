import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI) {
    console.error('MONGO_URI is not set. Please provide a valid MongoDB URI in the enviornment variables.');
    process.exit(1);
}

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log('\nConnected to Database');
		app.listen(PORT, () => console.log(`Server running on port ${PORT}\n`));
	})
	.catch((err) => {
		console.error('Database connection error:', err);
		process.exit(1);
	});
