import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() createUserDto: any) {
    console.log(' i am here', createUserDto);
    try {
      const responseData = await this.usersService.create(createUserDto);
      if (responseData) {
        return {
          statusCode: 200,
          message: 'Data Founded',
          result: responseData,
        };
      } else {
        return { statusCode: 404, message: 'Not Found', result: responseData };
      }
    } catch (er) {
      console.log('errror', er);
      return { statusCode: 401, message: 'Server Issue', result: null };
    }
  }
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
  //serving orderList
  @Get('orderList')
  async orderList() {
    console.log('product api called');
    this.client.emit('orderList', 'It will send the product list');
    return 'It will send the product list';
  }
  //requesting data 
  @EventPattern('productList')
  async productList(data: any) {
    console.log('================', data);
  }
}
