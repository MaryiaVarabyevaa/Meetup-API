import express from 'express';
import meetupController from "../meetup.controller";

const router = express.Router();

router.route('/')
  .get(meetupController.findAllMeetups)
  .post(meetupController.addMeetup)
  .put(meetupController.updateMeetup);

router.route('/:id')
  .get(meetupController.findMeetupById)
  .delete(meetupController.deleteMeetup);

router.get('/report/:type', meetupController.generateReport);

export { router }