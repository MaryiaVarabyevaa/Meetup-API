import {MeetUpAttributes} from "./MeetUpAttributes";
import {CreateOptions} from "sequelize";
import {MeetUpInstance} from "./MeetUpInstance";

export interface MeetupAfterCreateHook {
    (instance: MeetUpInstance, options: CreateOptions<MeetUpAttributes>): Promise<void> | void;
}