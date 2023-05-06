import express from 'express';
import { router as auth } from '../modules/auth/routes/index';
import { router as user } from '../modules/user/routes/index';

const router = express.Router();

router.use('/', auth);
router.use('/', user);

export { router };
