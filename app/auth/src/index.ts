// import dotenv from 'dotenv';
// import express from 'express';
// import cookieParser from 'cookie-parser';
// import { router } from './routes';
// import { passport } from './modules/auth/oauth.strategy';
// import { errorMiddleware } from './middlewares';
// import { prisma } from "./db/";
//
//
// dotenv.config({
//   path: process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env'
// });
//
//
// const app = express();
//
// const PORT = process.env.PORT || 8080;
//
//
//
// app.use(express.json());
// app.use(passport.initialize());
// app.use(cookieParser());
// // app.use('/api', router);
// app.use(errorMiddleware);
//
//
//
//
//
// const start = async () => {
//   try {
//     app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//   } catch (e) {
//     console.log(e);
//   }
// };
// start();
//
//
//
//

import express from 'express';
import amqp from 'amqplib';

const app = express();
app.use(express.json());


app.listen(8080, () => {
  console.log('Auth service listening on port 8080');
});
