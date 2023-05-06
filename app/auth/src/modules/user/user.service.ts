import { prisma, UserRole } from '../../db';
import { User } from "./types";

class UserService {
  async changeUserRole(id: number): Promise<User> {
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

  async findUser(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async uploadAvatar(id: number, avatarPath: string): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { avatar: avatarPath }
    });
    return updatedUser;
  }
}

export default new UserService();
