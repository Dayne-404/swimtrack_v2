import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log('Connected to Database');
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.log('Database connection error:', err);
		process.exit(1);
	});
