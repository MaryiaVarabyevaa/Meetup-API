import {Router} from 'express';

const router = new Router();

router.post('/registration');
router.post('/login');
router.get('/refresh');

export default router;