import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
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
            durable: false,
          },
        },
      },
    ]),
    forwardRef(() => ProductModule),
    TypeOrmModule,
    TypeOrmModule.forFeature([Product], 'test'),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
