import {Router} from 'express';
import meetupController from '../controllers/meetup-controller';

const router = new Router();

router.get('/', meetupController.findAllMeetups);
router.get('/:id', meetupController.findMeetupById);
router.post('/', meetupController.addMeetup);
router.put('/', meetupController.updateMeetup);
router.delete('/', meetupController.deleteMeetup);

export default router;

