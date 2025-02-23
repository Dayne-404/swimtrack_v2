import express from 'express';

import {
	createWorksheet,
	getWorksheets,
	getWorksheetById,
	updateWorksheet,
	deleteWorksheet,
} from '../controllers/worksheet.controller';

const router = express.Router();

router.get('/', getWorksheets);
router.get('/:id', getWorksheetById);

router.post('/', createWorksheet);

router.put('/:id', updateWorksheet);

router.delete('/:id', deleteWorksheet);

export default router;
