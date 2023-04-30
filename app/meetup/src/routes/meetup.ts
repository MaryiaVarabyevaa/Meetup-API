import {Router} from 'express';
import meetupController from "../controllers/meetup-controller";

const router = Router();

router.route('/')
  .get(meetupController.findAllMeetups)
  .post(meetupController.addMeetup)
  .put(meetupController.updateMeetup);

router.route('/:id')
  .get(meetupController.findMeetupById)
  .delete(meetupController.deleteMeetup);

export default router;