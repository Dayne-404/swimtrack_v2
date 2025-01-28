import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import instructorRoute from './routes/instructor.route';
import authenticationRoute from './routes/authentication.route';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/authenticate', authenticationRoute);
app.use('/api/instructors', instructorRoute);

export default app;
