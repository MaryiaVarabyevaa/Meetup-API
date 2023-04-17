import {Router} from 'express';
import meetup from "./meetup";
import user from "./user";

const router: Router = new Router();

router.use('/meetup', meetup);
router.use('/user', user);

export default router;