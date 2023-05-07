import { prisma } from "../../db";
import tagService from "../tag/tag.service";
import tagOnMeetupService from "../tagOnMeetup/tagOnMeetup.service";

class MeetupService {

  async findAllMeetups() {

  }

  async addMeetup(meetupDto: any) {
    const { topic, description, time, date, place, tags } = meetupDto;
    const createdMeetup = await prisma.meetup.create({
      data: {
        topic,
        description,
        time,
        date,
        place,
      },
    });
    const createdTags = await tagService.addTag(tags);
    await tagOnMeetupService.addTagOnMeetup(createdTags, createdMeetup.id);
    return createdMeetup;
  }

  async updateMeetup() {

  }

  async findMeetupById() {

  }

  async deleteMeetup() {

  }
}

export default new MeetupService();