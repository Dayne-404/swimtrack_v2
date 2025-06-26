import express from 'express';

import { login, logout, refreshAccessToken } from '../controllers/authentication.controller';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshAccessToken);

export default router;
 