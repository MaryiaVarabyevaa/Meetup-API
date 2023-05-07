import { prisma } from "../../db";
import tagService from "../tag/tag.service";
import tagOnMeetupService from "../tagOnMeetup/tagOnMeetup.service";

class MeetupService {

  async findAllMeetups() {
    const meetups = await prisma.meetup.findMany({
      // include включает связанные данные из другой таблицы (теги с каждым митапом)
      include: {
        // включаются все записи из таблицы tagOnMeetup, которые связаны с каждым митапом
        tags: {
          select: {
            tag: {
              // позволяет выбрать тольго теги (другие поля опускаются)
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return meetups.map((meetup) => ({ ...meetup, tags: meetup.tags.map((tagOnMeetup) => tagOnMeetup.tag.name) }));
  }

  async addMeetup(meetupDto: any) {
    const { topic, description, time, date, place, tags } = meetupDto;
    const meetup = await prisma.meetup.findFirst({
      where: { place, date, time },
    });
    if (meetup) {
      throw Error("Already has");
    }
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
    await Promise.all(
      createdTags.map(async (tag) => {
        await tagOnMeetupService.addTagOnMeetup(createdMeetup.id, tag.id)
      })
    )
    return { ...createdMeetup, tags };
  }

  async updateMeetup(data: any) {
    const { id, topic, description, time, date, place, tags } = data;
    const updatedMeetup = await prisma.meetup.update({
      where: { id },
      data: { topic, description, time, date, place },
    });

    await tagOnMeetupService.deleteTagOnMeetup(id);

    if (tags) {
      for (const tagName of tags) {
        const tag = await tagService.findOrUpdateTag(tagName);
        await tagOnMeetupService.addTagOnMeetup(id, tag.id);
      }
    }

    return updatedMeetup;
  }

  async findMeetupById(id: number) {
    const meetup = await prisma.meetup.findUnique({
      where: { id },
      include: {
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!meetup) {
      throw new Error(`Meetup with id ${id} not found`);
    }
    return { ...meetup, tags: meetup.tags.map((tagOnMeetup) => tagOnMeetup.tag.name) };
  }

  async deleteMeetup(id: number) {
    await tagOnMeetupService.deleteTagOnMeetup(id);
    const deletedMeetup = await prisma.meetup.delete({ where: { id } });
    return deletedMeetup;
  }
}

export default new MeetupService();