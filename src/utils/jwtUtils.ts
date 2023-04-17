import {UserType} from "../types/User";

export default class TokenPayload {
    id: number;
    email: string;
    role: string;

    constructor(body: UserType) {
        this.id = body.id;
        this.email = body.email;
        this.role = body.role;
    }
}