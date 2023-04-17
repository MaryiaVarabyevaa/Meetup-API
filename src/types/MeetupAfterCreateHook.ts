import {MeetUpAttributes, MeetUpInstance} from "./MeetUpAttributes";
import {CreateOptions} from "sequelize";

export interface MeetupAfterCreateHook {
    (instance: MeetUpInstance, options: CreateOptions<MeetUpAttributes>): Promise<void> | void;
}