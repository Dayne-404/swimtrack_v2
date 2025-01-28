import express, { Request, Response } from 'express';

import { createInstructor } from '../controllers/instructor.controller';

const router = express.Router();

router.post('/', (req: Request, res: Response) => createInstructor(req, res));

export default router;
