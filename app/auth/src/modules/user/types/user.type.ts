import { UserRole, Provider } from "../../../db/index";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  avatar: string | null;
  provider: Provider | null;
  role: UserRole | null;
}

export { User };
