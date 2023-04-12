import {Router} from 'express';
import meetupController from '../controllers/meetup-controller';
import validateNewMeetUpMiddleware from "../middlewares/validateNewMeetUp-middleware";

const router = new Router();

router.get('/', meetupController.findAllMeetups);
router.get('/:id', meetupController.findMeetupById);
router.post(
    '/',
    validateNewMeetUpMiddleware,
    meetupController.addMeetup);
router.put('/', meetupController.updateMeetup);
router.delete('/', meetupController.deleteMeetup);

export default router;

