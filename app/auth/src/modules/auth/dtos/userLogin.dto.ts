import { UserLoginDtoType } from "../types";

class UserLoginDto {
  email: string;
  password: string;

  constructor(data: UserLoginDtoType) {
    this.email = data.email;
    this.password = data.password;
  }
}

export { UserLoginDto };