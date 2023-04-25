import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'my_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    forwardRef(() => UserModule),
    TypeOrmModule,
    TypeOrmModule.forFeature([User], 'test'),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
