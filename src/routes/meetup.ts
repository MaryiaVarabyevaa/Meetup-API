import {Router} from 'express';
import meetupController from '../controllers/meetup-controller';

const router = new Router();

router.get('/', meetupController.getAllMeetups);
router.post('/', meetupController.addMeetup);

export default router;

