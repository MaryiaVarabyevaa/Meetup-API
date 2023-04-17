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
import * as swaggerDocument from '../src/swagger/openapi.json';
import {CreateMeetup} from "./types/CreateMeetup";
import {UpdateMeetup} from "./types/UpdateMeetup";
import {CreateUser} from "./types/CreateUser";

const PORT = process.env.PORT || 5000;

const app = express();

declare global {
    namespace Express {
        interface Request {
            user: {
                id: number;
                role: string;
                email: string;
            };
            validatedData: CreateMeetup | UpdateMeetup;
            userValidatedData: CreateUser;
        }
    }
}

app.use(express.json());
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);

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