import { Get, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'test')
    private readonly userRepository: Repository<User>,
  ) {}

  async create(reqData: any): Promise<User> {
    console.log('createUserDto', reqData);
    const userData = await this.userRepository.save(reqData);
    return userData;
  }
}
