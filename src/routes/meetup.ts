import {Router} from 'express';
import meetupController from '../controllers/meetup-controller';
import validateNewMeetUpMiddleware from "../middlewares/validateNewMeetUp-middleware";
import validateMeetupUpdateMiddleware from "../middlewares/validateMeetupUpdate-middleware";

const router = new Router();

router.route('/')
    .get(meetupController.findAllMeetups)
    .post(validateNewMeetUpMiddleware, meetupController.addMeetup)
    .put(validateMeetupUpdateMiddleware, meetupController.updateMeetup)
    .delete( meetupController.deleteMeetup);

router.get('/:id', meetupController.findMeetupById);

export default router;

