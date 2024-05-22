import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { name } });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}