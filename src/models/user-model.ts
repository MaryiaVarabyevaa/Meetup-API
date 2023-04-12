import {DataTypes} from 'sequelize';
import sequelize from '../db';
import {Token} from "./token-model";


export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})

User.hasOne(Token);
Token.belongsTo(User);

module.exports = {
    User
}
