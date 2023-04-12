import {Router} from 'express';
import meetup from "./meetup";
import user from "./user";

const router = new Router();

router.use('/meetup', meetup);
router.use('/user', user);

export default router;