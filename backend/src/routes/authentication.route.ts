import express, { Request, Response } from 'express';

import { login } from '../controllers/authentication.controller';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => login(req, res));

export default router;
