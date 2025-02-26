import express from 'express';
import { addWorksheetsToGroups, createGroup, deleteGroupById, getGroups, getWorksheetsByGroupId, removeWorksheetsFromGroup } from '../controllers/group.controller';

const router = express.Router();

//Create Group
router.post('/', createGroup);
router.post('/user/:targetUserId', createGroup);

//Update Group
router.put('/:groupId/worksheets', addWorksheetsToGroups);

//Get Groups
router.get('/', getGroups);
router.get('/:groupId/worksheets', getWorksheetsByGroupId);
router.get('/user/:taretUserId', getGroups);

//Delete Group && Remove Worksheets from Group
router.delete('/:groupId/worksheets', removeWorksheetsFromGroup);
router.delete('/:groupId', deleteGroupById);

export default router;