import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import userRoute from './routes/user.route';
import worksheetRoute from './routes/worksheet.route';
import authenticationRoute from './routes/authentication.route';
import groupRoute from './routes/group.route';
import { authenticateToken } from './controllers/authentication.controller';
import { errorHandler } from './utils/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authenticationRoute, errorHandler);
app.use('/api/worksheets', authenticateToken, worksheetRoute, errorHandler);
app.use('/api/users', authenticateToken, userRoute, errorHandler);
app.use('/api/groups', authenticateToken, groupRoute, errorHandler);

app.use(errorHandler);

export default app;
