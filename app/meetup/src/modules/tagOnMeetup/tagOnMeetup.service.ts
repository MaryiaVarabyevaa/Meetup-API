import { prisma } from "../../db";
import { Tag } from "../tag/types";

class TagOnMeetupService {

  async addTagOnMeetup(createdTags: Tag[], meetupId:number) {
   return await Promise.all(
      createdTags.map(async (tag) => {
        await prisma.tagOnMeetup.create({
          data: {
            tagId: tag.id,
            meetupId,
          },
        });
      })
    )
  }

}

export default new TagOnMeetupService();
