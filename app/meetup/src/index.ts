import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import amqp from 'amqplib';
import { router } from "./modules/meetup/routes";
import { Producer } from "./producer";


dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env'
});

const PORT = process.env.PORT || 8080;

const app = express();
const producer = new Producer();

app.use(express.json());
app.use(express.static('reports'));
// app.use('/api', router);

app.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.send("Hello from meetup microservice");
})

app.post("/sendLog", async (req: Request, res: Response, _next: NextFunction) => {
  try {
    await producer.publishMessage(req.body.logType, req.body.message);
    res.send("Done");
  } catch (err) {
    console.log(err);
  }
})

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();


// import express from 'express';
// import amqp from 'amqplib';
// import { v4 as uuidv4 } from 'uuid';
//
// const app = express();
// app.use(express.json());
//
// const RABBITMQ_URL = 'amqp://guest:guest@rabbitmq:5672';
//
// const start = async () => {
//   try {
//     const connection = await amqp.connect(RABBITMQ_URL);
//     const channel = await connection.createChannel();
//     await channel.assertQueue('authQueue');
//
//     app.post('/meetup', async (req, res) => {
//       console.log('here');
//       const { email, title } = req.body;
//
//       const correlationId = uuidv4();
//       console.log('and here 1');
//       const replyQueue = await channel.assertQueue('', { exclusive: true });
//
//       console.log('and here 2');
//       channel.sendToQueue('authQueue', Buffer.from(JSON.stringify({ email })), {
//         correlationId,
//         replyTo: replyQueue.queue,
//       });
//
//       await channel.consume(replyQueue.queue, (msg) => {
//         if (msg && msg.properties.correlationId === correlationId) {
//           const { userExists } = JSON.parse(msg.content.toString());
//
//           if (userExists) {
//             res.status(201).json({ message: 'Meetup created' });
//           } else {
//             res.status(400).json({ message: 'User not found' });
//           }
//
//           channel.cancel(msg.fields.consumerTag);
//         }
//       });
//     });
//
//     app.listen(5000, () => {
//       console.log('Meetup service listening on port 5000');
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
//
// start();
