import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";
import meetupService from "./meetup.service";
import { createReadStream } from "./utils";

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

  async updateMeetup(req: Request, res: Response, next: NextFunction) {
    try {
      const meetup = await meetupService.updateMeetup(req.body);
      res.json(meetup)
    } catch (err) {
      next(err);
      return;
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

  async generateReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { type } = req.params;
      let doc;
      if (type === "pdf") {
        doc = await meetupService.generateReportPDF();
      } else {
        doc = await meetupService.generateReportCSV();
      }
      const PATH = path.join(__dirname, "../../reports", doc);

      if (fs.existsSync(PATH)) {
        const file = await createReadStream(PATH);
        const info = fs.statSync(PATH);
        const contentType = type === "pdf" ? "application/pdf" : "text/csv";

        res.setHeader("Content-Length", info.size);
        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Disposition", `attachment; filename=${doc}`);
        file.pipe(res);
        return;
      } else {
        return res.status(404).send("File not found");
      }
    } catch (err) {
      next(err);
      return;
    }
  }
}

export default new MeetupController();