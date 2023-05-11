import express from 'express';
import meetupController from '../meetup.controller';
import { validateMiddleware } from '../middlewares';
import {
  validateCreateMeetup,
  validateId,
  validateReport,
  validateUpdateMeetup,
} from '../validators';

const router = express.Router();

router
  .route('/')
  .get(meetupController.findAllMeetups)
  .post(validateMiddleware(validateCreateMeetup), meetupController.addMeetup)
  .put(validateMiddleware(validateUpdateMeetup), meetupController.updateMeetup);

router
  .route('/:id')
  .get(validateMiddleware(validateId), meetupController.findMeetupById)
  .delete(validateMiddleware(validateId), meetupController.deleteMeetup);

router.get('/report/:type', validateMiddleware(validateReport), meetupController.generateReport);

export { router };
