// import {DataTypes, Model} from 'sequelize';
// import sequelize from '../db';
//
//
// export const Token = sequelize.define('token', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     refresh_token: {type: DataTypes.STRING, allowNull: false},
// })
//
// Token.addHook('afterCreate', (instance, options) => {
//     delete instance.dataValues.createdAt;
//     delete instance.dataValues.updatedAt;
//     return instance;
// });
//
// Token.addHook('afterFind', (result, options) => {
//     if (result instanceof Model && 'dataValues' in result) {
//         delete result.dataValues.createdAt;
//         delete result.dataValues.updatedAt;
//     }
// });
//
// module.exports = {
//     Token
// }

import { DataTypes, Model, CreateOptions } from 'sequelize';
import sequelize from '../db';

export const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refresh_token: {type: DataTypes.STRING, allowNull: false},
});

const afterCreateHook = async (instance: Model<any, any>, options: CreateOptions<any>) => {
    delete instance.dataValues.createdAt;
    delete instance.dataValues.updatedAt;
};

Token.addHook('afterCreate', afterCreateHook);

const afterFindHook = async (result: Model<any, any>, options: CreateOptions<any>) => {
    if (result instanceof Model && 'dataValues' in result) {
        delete result.dataValues.createdAt;
        delete result.dataValues.updatedAt;
    }
};

Token.addHook('afterFind', afterFindHook);

export default Token;