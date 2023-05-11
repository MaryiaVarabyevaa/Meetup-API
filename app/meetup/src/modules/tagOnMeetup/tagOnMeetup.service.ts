import { prisma } from '../../db';
import { Tag } from '../tag/types';

class TagOnMeetupService {
  async addTagOnMeetup(meetupId: number, tagId: number) {
    return await prisma.tagOnMeetup.create({
      data: { meetupId, tagId }
    });
  }

  async deleteTagOnMeetup(meetupId: number) {
    return await prisma.tagOnMeetup.deleteMany({ where: { meetupId } });
  }
}

export default new TagOnMeetupService();
