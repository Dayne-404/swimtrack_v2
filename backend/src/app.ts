import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import userRoute from './routes/user.route';
import worksheetRoute from './routes/worksheet.route';
import authenticationRoute from './routes/authentication.route';
import { authenticateToken } from './controllers/authentication.controller';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/authenticate', authenticationRoute);
app.use('/api/worksheets', authenticateToken, worksheetRoute);
app.use('/api/users', authenticateToken, userRoute);

export default app;
