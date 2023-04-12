import {Router} from 'express';
import userController from "../controllers/user-controller";

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);

export default router;