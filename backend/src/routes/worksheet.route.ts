import express from 'express';

import {
	createWorksheet,
	getWorksheets,
	getWorksheetById,
	updateWorksheet,
	deleteWorksheet,
} from '../controllers/worksheet.controller';

const router = express.Router();

router.post('/', createWorksheet);

router.put('/:worksheetId', updateWorksheet);

router.get('/', getWorksheets);
router.get('/:worksheetId', getWorksheetById);

router.delete('/:worksheetId', deleteWorksheet);

export default router;
