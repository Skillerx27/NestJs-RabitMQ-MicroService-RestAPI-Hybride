import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { ClientProxy } from '@nestjs/microservices';
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}
  //checking connection establish or not
  async onApplicationBootstrap() {
    const x = await this.client
      .connect()
      .then((res) => {
        console.log('res', res);
      })
      .catch((er) => {
        console.log('e', er);
      });
    console.log('x', x);
  }
  //requesting orderList
  @EventPattern('orderList')
  async orderList(data: any) {
    console.log('================', data);
    return data;
  }

  //serving productList
  @Get('productList')
  async productList() {
    // this.client.emit('productList', 'It will send the product list');
    // return 'It will send the product list';
    return new Promise((resolve, reject) => {
      this.client
        .send('productList', {
          msg: 'Hello',
        })
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (error) => {
            console.log('error', error);
            reject(error);
          },
        });
    });
  }
}
