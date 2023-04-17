import {MeetUpAttributes, MeetUpInstance} from "./MeetUpAttributes";
import {CreateOptions} from "sequelize";

export interface AfterCreateHook {
    (instance: MeetUpInstance, options: CreateOptions<MeetUpAttributes>): Promise<void> | void;
}