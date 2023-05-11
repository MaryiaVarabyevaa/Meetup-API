import dotenv from 'dotenv';
import express from 'express';
import { router } from './modules/meetup/routes';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env'
});

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.static('reports'));
app.use('/api', router);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
