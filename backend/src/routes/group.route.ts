import express from 'express';
import { addWorksheetToGroups, createGroup, getWorksheetsByGroupId } from '../controllers/group.controller';

const router = express.Router();

//Get Groups
router.get('/:id/worksheets', getWorksheetsByGroupId);

//Update Group
router.put('/addWorksheetsToGroups', addWorksheetToGroups);

//Create Group
router.post('/', createGroup);

export default router;