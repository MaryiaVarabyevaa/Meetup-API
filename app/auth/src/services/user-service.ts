import { User } from '../db/models/user-model';

class UserService {
  async registration(obj: any) {
    const { firstName, lastName, ...rest } = obj;
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      ...rest
    });
    return user;
  }
}

export default new UserService();
