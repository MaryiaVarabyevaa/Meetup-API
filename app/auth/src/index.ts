import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './routes';
import { passport } from './modules/auth/oauth.strategy';
import { errorMiddleware } from './middlewares';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env'
});

const PORT = process.env.PORT || 8080;


const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
