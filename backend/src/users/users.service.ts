import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { emailAlreadyExists, usernameAlreadyExists } from '../utils/constants';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async find(param: string): Promise<User[]> {
    return await this.usersRepository.find({
      where: [{ email: param }, { username: param }],
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return await this.usersRepository.save(user);
  }

  async update(
    id: number,
    user: Partial<UpdateUserDto>,
  ): Promise<UpdateUserDto> {
    const userCurrent = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    const userUsername = await this.usersRepository.findOne({
      where: {
        username: user.username,
      },
    });

    const userEmail = await this.usersRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (
      user.username !== userCurrent.username &&
      user.username &&
      userUsername
    ) {
      throw new BadRequestException(`${usernameAlreadyExists}`);
    }

    if (user.email !== userCurrent.email && user.email && userEmail) {
      throw new BadRequestException(`${emailAlreadyExists}`);
    }

    user.updatedAt = await new Date();

    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }

    await this.usersRepository.update(id, user);
    return this.usersRepository.findOne({ where: { id } });
  }

  async findWishes(id: number): Promise<Wish[]> {
    const userWithWishes = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        wishes: true,
      },
    });
    return userWithWishes.wishes;
  }
}
