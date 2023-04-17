import {DataTypes} from 'sequelize';
import sequelize from '../db';
import {MeetupAfterCreateHook} from "../types/MeetupAfterCreateHook";


export const MeetUp = sequelize.define('meetup', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    topic: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    keywords: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATEONLY, allowNull: false},
    place: {type: DataTypes.STRING, allowNull: false},
}, { paranoid: true });

const afterCreateHook: MeetupAfterCreateHook = async (instance, options) => {
    delete instance.dataValues.deletedAt;
    delete instance.dataValues.createdAt;
    delete instance.dataValues.updatedAt;
};

MeetUp.addHook('afterCreate', afterCreateHook);
MeetUp.addHook('afterFind', (result, options) => {
    if (Array.isArray(result)) { // Handle findAndCountAll result
        result.forEach(item => {
            if (item instanceof MeetUp) {
                delete item.dataValues.deletedAt;
                delete item.dataValues.createdAt;
                delete item.dataValues.updatedAt;
            }
        });
    }
    if (result && !(result instanceof Array)) {
        delete result.dataValues.deletedAt;
        delete result.dataValues.createdAt;
        delete result.dataValues.updatedAt;
    }
});

module.exports ={
    MeetUp
}