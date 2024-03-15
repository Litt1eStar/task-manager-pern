import express from 'express'

import { getCurrentUser } from './user.controller.js';
import { verifedToken } from '../middleware/verifedToken.js';

const router = express.Router();

router.get('/currentUser', verifedToken, getCurrentUser);

export default router;
