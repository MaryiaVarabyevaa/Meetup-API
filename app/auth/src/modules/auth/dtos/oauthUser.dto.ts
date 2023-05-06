import { OauthUserDtoType } from '../types';

class OauthUserDto {
  firstName: string;

  lastName: string;

  email: string;

  constructor(data: OauthUserDtoType) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
  }
}

export { OauthUserDto };
