import { prisma, UserRole } from '../db';

class UserService {
  async changeUserRole(id: number) {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      throw Error('Error');
    }
    const { role } = userExists;
    const newRole = UserRole.USER === role ? UserRole.ORGANIZER : UserRole.USER;
    const user = await prisma.user.update({
      where: { id },
      data: { role: newRole }
    });
    return user;
  }

  async findUser(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async uploadAvatar(id: number, avatarPath: string) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { avatar: avatarPath }
    });
    return updatedUser;
  }
}

export default new UserService();
