import express, { Request, Response } from 'express';

import { createWorksheet, findWorksheet } from '../controllers/worksheet.controller';

const router = express.Router();

router.post('/', createWorksheet);
router.get('/', findWorksheet);

export default router;
