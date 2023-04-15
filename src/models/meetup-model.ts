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

MeetUp.addHook('afterFind', (result, options) => {
    if (Array.isArray(result)) { // Handle findAndCountAll result
        result.forEach(item => {
            delete item.dataValues.deletedAt;
            delete item.dataValues.createdAt;
            delete item.dataValues.updatedAt;
        });
    }
    if (result) {
        delete result.dataValues.deletedAt;
        delete result.dataValues.createdAt;
        delete result.dataValues.updatedAt;
    }
});

module.exports = {
    MeetUp
}
