import express, { Request, Response } from 'express';
import { isAdmin } from '../utils/authentication';
import { createUser, getUserById, searchForUser, updateUser } from '../controllers/user.controller';

const router = express.Router();

//TODO get rid of isAdmin?
router.post('/', isAdmin, createUser);

router.put('/:targetUserId', updateUser);

router.get('/:targetUserId', getUserById);
router.get('/', searchForUser);

export default router;
