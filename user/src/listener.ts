import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:15672'],
      queue: 'main_queue',
      queueOptions: {
        durable: true,
      },
    },
  }).then((res) => {
    console.log('User micros-service is running');
    res.listen();
  });
}
bootstrap();
