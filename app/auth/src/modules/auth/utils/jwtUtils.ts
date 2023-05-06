import { User } from '../types';

class TokenPayload {
  id: number;

  email: string;

  role: string;

  constructor(body: User) {
    this.id = body.id;
    this.email = body.email;
    this.role = body.role;
  }
}

export { TokenPayload };
