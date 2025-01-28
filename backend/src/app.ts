import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import instructorRoute from './routes/instructor.route';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/instructors', instructorRoute);

export default app;
