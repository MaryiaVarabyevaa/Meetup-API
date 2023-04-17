import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import sequelize from './db';
const meetupModel = require('../src/models/meetup-model');
const userModer = require('../src/models/user-model');
const tokenModel = require('../src/models/token-model');
import router from "./routes/index";
import errorMiddleware from "./middlewares/error-middleware";
import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from '../src/swagger/openapi.json';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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