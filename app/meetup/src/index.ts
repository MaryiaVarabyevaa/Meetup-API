import dotenv from 'dotenv';
import express from 'express';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env'
});

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();