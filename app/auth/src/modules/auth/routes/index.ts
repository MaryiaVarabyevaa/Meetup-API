import express from 'express';
import { router as auth } from './auth';

const router = express.Router();

router.use('/auth', auth);

export { router };