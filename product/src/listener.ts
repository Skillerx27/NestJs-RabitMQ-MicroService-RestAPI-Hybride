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
  }).then(async (res) => {
    await res.listen();
    console.log('Product Micro-service is running', res);
  });
}
bootstrap();
