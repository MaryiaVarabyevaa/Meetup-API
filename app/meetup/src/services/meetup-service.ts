import { MeetUp } from "../db/models/meetup-model";

class MeetupService {
  async findAllMeetups() {
    const meetups = MeetUp.findAll();
    return meetups;
  }

  async findMeetupById(id: number) {
    const meetup = await MeetUp.findOne({
      where: {id},
    });
    if (!meetup) {
      // throw ApiError.NotFound(ErrorMessages.MEETUP_NOT_FOUNT);
    }
    return meetup;
  }

  //TODO: delete any type
  async addMeetup(meetupDto: any, userId: number) {
    const {  time, date,  place } = meetupDto;
    const meetup = await MeetUp.findOne({where: {place, date, time}});
    if (meetup) {
      // throw ApiError.Conflict(ErrorMessages.MEETUP_CONFLICT);
    }
    const newMeetup = await MeetUp.create({...meetupDto, userId});
    return newMeetup;
  }

  async updateMeetup(meetupDto: any) {
    const { id, ...rest } = meetupDto;
    const meetup = await MeetUp.findOne({ where: {id} });
    if (!meetup) {
      // throw ApiError.NotFound(ErrorMessages.MEETUP_NOT_FOUNT);
    }
    await meetup!.update({...rest});
    await meetup!.save();
    const updatedInstance = await MeetUp.findByPk(id);
    return updatedInstance;
  }

  async deleteMeetup(id: number, userId: number) {
    const meetup = await MeetUp.findOne({ where: {id} });
    if (!meetup) {
      // throw ApiError.NotFound(ErrorMessages.MEETUP_NOT_FOUNT);
    }
    await MeetUp.destroy({
      where: { id }
    });
    return { success: true };
  }

}

export default new MeetupService();