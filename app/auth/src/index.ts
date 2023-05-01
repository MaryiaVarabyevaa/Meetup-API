import dotenv from 'dotenv';
import express from 'express';
import sequelize from './db/db';
import User from './db/models/user-model';
import router from "./routes";
import errorMiddleware from "./middlewares/error-middleware";


dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }).then(() => {
      console.log('Database tables created.');
    });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
