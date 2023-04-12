import {DataTypes} from 'sequelize';
import sequelize from '../db';


export const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refresh_token: {type: DataTypes.STRING, allowNull: false},
})

module.exports = {
    Token
}
