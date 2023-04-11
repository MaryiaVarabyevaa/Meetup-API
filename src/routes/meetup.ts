import {Router} from 'express';
import meetupController from '../controllers/meetup-controller';

const router = new Router();

router.get('/', meetupController.findAllMeetups);
router.get('/:id', meetupController.findMeetupById);
router.post('/', meetupController.addMeetup);

export default router;

