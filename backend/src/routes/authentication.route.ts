import express, { Request, Response } from 'express';

import { login, refreshToken } from '../controllers/authentication.controller';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => login(req, res));
router.post('/refresh', (req: Request, res: Response) => refreshToken(req, res));

export default router;
