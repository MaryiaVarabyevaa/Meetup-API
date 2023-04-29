import {MeetupModelInstance} from "./MeetupModelInstance";

export interface MigrationMeetupResult extends MeetupModelInstance {
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}