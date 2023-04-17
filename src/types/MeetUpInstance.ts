import {Model} from "sequelize";
import {MeetUpAttributes} from "./MeetUpAttributes";

export interface MeetUpInstance extends Model<MeetUpAttributes>, MeetUpAttributes {}