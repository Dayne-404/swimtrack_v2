import express from 'express';
import { addWorksheetToGroups, createGroup, getGroups, getWorksheetsByGroupId } from '../controllers/group.controller';

const router = express.Router();

//Get Groups
router.get('/user/:id/worksheets', getWorksheetsByGroupId);
router.get('/user/:id', getGroups);
router.get('/', getGroups);

//Update Group
router.put('/addWorksheetsToGroups', addWorksheetToGroups);

//Create Group
router.post('/', createGroup);

export default router;