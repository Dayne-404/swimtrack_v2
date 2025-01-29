import express, { Request, Response } from 'express';

import { createUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/', (req: Request, res: Response) => createUser(req, res));

export default router;
