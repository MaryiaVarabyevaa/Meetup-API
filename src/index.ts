import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import sequelize from './db';
const models = require('../src/models/meetup-model');

const app = express();


const PORT = process.env.PORT || 5000;


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start();