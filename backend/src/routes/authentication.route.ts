import express, { Request, Response } from 'express';

import { login, refreshAccessToken } from '../controllers/authentication.controller';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => login(req, res));
router.post('/refresh', (req: Request, res: Response) => refreshAccessToken(req, res));

export default router;
