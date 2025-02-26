import express from 'express';
import { addWorksheetToGroups, createGroup, getGroups, getWorksheetsByGroupId, removeWorksheetsFromGroup } from '../controllers/group.controller';

const router = express.Router();

//Get Groups
router.get('/user/:id/worksheets', getWorksheetsByGroupId);
router.get('/user/:id', getGroups);
router.get('/', getGroups);

//Update Group
router.put('/addWorksheetsToGroups', addWorksheetToGroups);
router.put('/removeWorksheetsFromGroups/:id', removeWorksheetsFromGroup);

//Create Group
router.post('/', createGroup);

//Delete Group
router.delete('/:id');

export default router;