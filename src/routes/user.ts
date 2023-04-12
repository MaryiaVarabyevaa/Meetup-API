import {Router} from 'express';
import userController from "../controllers/user-controller";
import validateRegistrationMiddleware from "../middlewares/validateRegistration-middleware";

const router = new Router();

router.post(
    '/registration',
    validateRegistrationMiddleware,
    userController.registration);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);

export default router;