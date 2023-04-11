import {Router} from 'express';
import meetup from "./meetup";

const router = new Router();

router.use('/meetup', meetup);

export default router;