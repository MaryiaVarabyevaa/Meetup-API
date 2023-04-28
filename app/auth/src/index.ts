import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello, world from auth!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
