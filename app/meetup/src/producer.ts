import amqp from 'amqplib';


// const config = {
//   rabbitMQ:{
//     url: "amqp://127.0.0.1",
//     exchangeName: "logExchange"
//   }
// }

const config = {
  rabbitMQ:{
    url: "amqp://rabbitmq",
    exchangeName: "logExchange"
  }
}

class Producer {
  channel: any;



  async createChannel() {
    try {
      const connection = await amqp.connect(config.rabbitMQ.url);
      this.channel = await connection.createChannel();
    } catch (error) {
      console.error('Error while connecting to RabbitMQ:', error);
      throw error;
    }
  }


  async publishMessage(routingKey: any, message: any) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, 'direct');

    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date()
    }

    await this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(logDetails)));

    console.log(`The message ${message} is sent to exchange ${exchangeName}`);
  }
}

export { Producer };