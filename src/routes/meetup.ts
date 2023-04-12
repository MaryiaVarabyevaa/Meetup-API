import {Router} from 'express';
import meetupController from '../controllers/meetup-controller';
import validateNewMeetUpMiddleware from "../middlewares/validateNewMeetUp-middleware";
import validateMeetupUpdateMiddleware from "../middlewares/validateMeetupUpdate-middleware";

const router = new Router();

router.get('/', meetupController.findAllMeetups);
router.get('/:id', meetupController.findMeetupById);
router.post(
    '/',
    validateNewMeetUpMiddleware,
    meetupController.addMeetup);
router.put(
    '/',
    validateMeetupUpdateMiddleware,
    meetupController.updateMeetup
);
router.delete('/', meetupController.deleteMeetup);

export default router;

