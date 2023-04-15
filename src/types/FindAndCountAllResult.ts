import {MeetupModelInstance} from "./MeetupModelInstance";

export interface FindAndCountAllResult {
    count: number;
    rows: MeetupModelInstance[];
}