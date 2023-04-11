import {DataTypes} from 'sequelize';
import sequelize from '../db';


export const MeetUp = sequelize.define('meetup', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    topic: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    keywords: {type: DataTypes.STRING},
    event_time: {type: DataTypes.DATE},
    event_place: {type: DataTypes.STRING},
})

module.exports = {
    MeetUp
}
