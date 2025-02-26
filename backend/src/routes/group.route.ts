import express from 'express';
import { addWorksheetToGroups, createGroup, deleteGroupById, getGroups, getWorksheetsByGroupId, removeWorksheetsFromGroup } from '../controllers/group.controller';

const router = express.Router();

//Get Groups
router.get('/:groupId/worksheets', getWorksheetsByGroupId);
router.get('/user/:userId', getGroups);
router.get('/', getGroups);

//Update Group
router.put('/:groupId/worksheets', addWorksheetToGroups);

//Create Group
router.post('/', createGroup);
router.post('/user/:userId', createGroup);

//Delete Group && Remove Worksheets from Group
router.delete('/:groupId/worksheets', removeWorksheetsFromGroup);
router.delete('/:groupId', deleteGroupById);

export default router;