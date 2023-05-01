import { Request, Response, NextFunction } from 'express';
import meetupService from "../services/meetup-service";

class MeetupController {
  async findAllMeetups(req: Request, res: Response, next: NextFunction) {
    try {
      const meetups = await meetupService.findAllMeetups();
      return res.status(200).json(meetups);
    } catch (err) {
      next(err);
      return;
    }
  }

  async findMeetupById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const meetup = await meetupService.findMeetupById(+id);
      return res.status(200).json(meetup)
    } catch (err) {
      next(err);
      return;
    }
  }

  async addMeetup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const meetup = await meetupService.addMeetup(req.validatedData, id);
      return res.status(201).json(meetup);
    } catch (err) {
      next(err);
      return;
    }
  }

  async updateMeetup(req: Request, res: Response, next: NextFunction)   {
    try {
      const updatedMeetup = await meetupService.updateMeetup(req.validatedData);
      return res.status(200).json(updatedMeetup);
    } catch (err) {
      next(err);
      return;
    }
  }

  async deleteMeetup(req: Request, res: Response, next: NextFunction)   {
    try {
      const { id } = req.user;
      const deletedMeetup = await meetupService.deleteMeetup(+req.params.id, id);
      return res.status(204).json(deletedMeetup);
    } catch (err) {
      next(err);
      return;
    }
  }
}

export default new MeetupController();