import dotenv from 'dotenv';
import express from 'express';
import sequelize from './db/db';
import Meetup from './db/models/meetup-model';
import router from "./routes";
import errorMiddleware from "./middlewares/error-middleware";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
