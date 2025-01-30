import express, { Request, Response } from 'express';

import { createWorksheet } from '../controllers/worksheet.controller';

const router = express.Router();

router.post('/', (req: Request, res: Response) => createWorksheet(req, res));

export default router;
