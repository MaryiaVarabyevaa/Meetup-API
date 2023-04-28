import dotenv from 'dotenv';
import express from 'express';
import sequelize from './db/db';
import User from './db/models/user-model';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello, world from auth!');
});

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
