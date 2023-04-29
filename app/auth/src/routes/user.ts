import { Router } from 'express';
import userController from '../controllers/user-controller';

const router = Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);
router.put('/:id/profile', userController.updateUserProfile);
router.put('/:id/role', userController.changeUserRole);

export default router;
