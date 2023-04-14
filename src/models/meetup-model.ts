import {DataTypes} from 'sequelize';
import sequelize from '../db';


export const MeetUp = sequelize.define('meetup', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    topic: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    keywords: {type: DataTypes.STRING, allowNull: false},
    event_time: {type: DataTypes.DATE, allowNull: false},
    event_place: {type: DataTypes.STRING, allowNull: false},
}, { paranoid: true })

MeetUp.addHook('afterCreate', (instance, options) => {
    delete instance.dataValues.deletedAt;
    delete instance.dataValues.createdAt;
    delete instance.dataValues.updatedAt;
    return instance;
});

module.exports = {
    MeetUp
}
