import { CreateOptions, DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import {TokenInstance} from "../types/TokenInstance";
import {TokenAttributes} from "../types/TokenAttributes";


export const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refresh_token: {type: DataTypes.STRING, allowNull: false},
});

const afterCreateHook = async (instance: TokenInstance, options: CreateOptions) => {
    delete instance.dataValues.createdAt;
    delete instance.dataValues.updatedAt;
};

const afterFindHook = async (result: Model<TokenAttributes, TokenAttributes>, options: CreateOptions<TokenAttributes>) => {
    if (result instanceof Model && 'dataValues' in result) {
        delete result.dataValues.createdAt;
        delete result.dataValues.updatedAt;
    }
};

Token.addHook('afterCreate', afterCreateHook);
Token.addHook('afterFind', afterFindHook);

module.exports = {
    Token
}