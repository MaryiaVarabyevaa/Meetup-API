import { Request, Response, NextFunction } from "express";
import meetupService from "./meetup.service";

class MeetupController {
  async findAllMeetups() {

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

  }

  async findMeetupById() {

  }

  async deleteMeetup() {

  }
}

export default new MeetupController();