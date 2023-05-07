import { prisma } from "../../db";

class TagService {

  async findTag(tagName: string) {
    const tag = await prisma.tag.findUnique({ where: { name: tagName } });
    return tag;
  }

  async addTag(tags: string[]) {
    const newTags = await Promise.all(
      tags.map(async (tagName: string) => {
        const existingTag = await this.findTag(tagName);
        if (existingTag) {
          return existingTag;
        }
        return await prisma.tag.create({ data: { name: tagName } });
      })
    );
    return newTags;
  }

}

export default new TagService();