import express from 'express';
import meetupController from '../controllers/meetup-controller';
import validateNewMeetUpMiddleware from '../middlewares/validateNewMeetUp-middleware';
import validateMeetupUpdateMiddleware from '../middlewares/validateMeetupUpdate-middleware';
import authMiddleware from '../middlewares/auth-middleware';

const router = express.Router();

router.route('/')
  .get(meetupController.findAllMeetups)
  .post(authMiddleware, validateNewMeetUpMiddleware, meetupController.addMeetup)
  .put(authMiddleware, validateMeetupUpdateMiddleware, meetupController.updateMeetup);

router.route('/:id')
  .get(meetupController.findMeetupById)
  .delete(authMiddleware, meetupController.deleteMeetup);

export default router;
