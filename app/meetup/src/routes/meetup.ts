import {Router} from 'express';

const router = Router();

router.route('/')
  .get(()=>{})
  .post(()=>{})
  .put(()=>{});

router.route('/:id')
  .get(()=>{})
  .delete(()=>{});

export default router;