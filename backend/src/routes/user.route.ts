import express, { Request, Response } from 'express';
import { isAdmin } from '../utils/authentication';
import { createUser, updateUser } from '../controllers/user.controller';
import { errorHandler } from '../utils/errorHandler';

const router = express.Router();

router.post('/', isAdmin, createUser, errorHandler);
router.put('/:id', updateUser, errorHandler);

export default router;
