import express from 'express';
import { router as user } from './user';

const router = express.Router();

router.use('/user', user);

export { router };
