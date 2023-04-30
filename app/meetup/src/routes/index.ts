import {Router} from 'express';
import meetup from "./meetup";

const router = Router();

router.use('/meetup', meetup);

export default router;
