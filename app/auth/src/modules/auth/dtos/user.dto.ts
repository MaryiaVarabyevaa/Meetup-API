import { UserDtoType } from '../types';

class UserDto {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  constructor(data: UserDtoType) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
  }
}

export { UserDto };
