import { Request, Response, NextFunction } from "express";
import meetupService from "./meetup.service";

class MeetupController {
  async findAllMeetups(req: Request, res: Response, next: NextFunction) {
    try {
      const meetups = await meetupService.findAllMeetups();
      return res.json(meetups);
    } catch (err) {
      next(err);
      return;
    }
  }

  async addMeetup(req: Request, res: Response, next: NextFunction) {
    try {
      const meetup = await meetupService.addMeetup(req.body);
      res.json(meetup);
    } catch (err) {
      next(err);
      return;
    }
  }

  async updateMeetup() {
    try {

    } catch (err) {

    }
  }

  async findMeetupById(req: Request, res: Response, next: NextFunction) {
    try {
      const meetup = await meetupService.findMeetupById(+req.params.id);
      res.json(meetup);
    } catch (err) {
      next(err);
      return;
    }
  }

  async deleteMeetup(req: Request, res: Response, next: NextFunction) {
    try {
      const meetup = await meetupService.deleteMeetup(+req.params.id);
      return res.json(meetup);
    } catch (err) {
      next(err);
      return;
    }
  }
}

export default new MeetupController();