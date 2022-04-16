import { Transport } from '@nestjs/microservices';

const RMQOPTIONS = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:15672'],
    queue: 'main_queue',
    queueOptions: {
      durable: false,
    },
  },
};

export default RMQOPTIONS;
