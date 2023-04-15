import { Request } from "express";
import {CreateUser} from "./CreateUser";
import {CreateMeetup} from "./CreateMeetup";
import {UpdateMeetup} from "./UpdateMeetup";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        role: string;
        email: string;
    };

    validatedData?: CreateMeetup | UpdateMeetup;
    userValidatedData?: CreateUser;
}