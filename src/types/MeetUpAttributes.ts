import {Model} from "sequelize";

export interface MeetUpAttributes {
    id?: number;
    topic: string;
    description: string;
    keywords: string;
    time: string;
    date: string;
    place: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface MeetUpInstance extends Model<MeetUpAttributes>, MeetUpAttributes {}