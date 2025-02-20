import express from 'express';

import {
	createWorksheet,
	findWorksheet,
	getWorksheetById,
	updateWorksheet,
	deleteWorksheet,
} from '../controllers/worksheet.controller';

const router = express.Router();

router.get('/', findWorksheet);
router.get('/:id', getWorksheetById);

router.post('/', createWorksheet);

router.put('/:id', updateWorksheet);

router.delete('/:id', deleteWorksheet);

export default router;
