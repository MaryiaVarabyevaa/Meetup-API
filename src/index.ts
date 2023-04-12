import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import sequelize from './db';
const meetupModel = require('../src/models/meetup-model');
const userModer = require('../src/models/user-model');
import router from "./routes/index";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/api', router)


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