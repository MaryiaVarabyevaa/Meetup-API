import {DataTypes} from 'sequelize';
import sequelize from '../db';


export const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refresh_token: {type: DataTypes.STRING, allowNull: false},
})

Token.addHook('afterCreate', (instance, options) => {
    delete instance.dataValues.createdAt;
    delete instance.dataValues.updatedAt;
    return instance;
});

Token.addHook('afterFind', (result, options) => {
    if (result) {
        delete result.dataValues.createdAt;
        delete result.dataValues.updatedAt;
    }
});

module.exports = {
    Token
}
