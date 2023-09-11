import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtGuard } from '../auth/jwt-auth.guard';
import { Wish } from '../wishes/entities/wish.entity';
import { userNotFound } from '../utils/constants';
import { UpdateUserDto } from './dto/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async viewProfile(@Req() req): Promise<User> {
    if (!req.user) {
      throw new NotFoundException(`${userNotFound}`);
    } else {
      return req.user;
    }
  }

  @Patch('me')
  async editProfile(@Req() req, @Body() user: User): Promise<UpdateUserDto> {
    if (!req.user) {
      throw new NotFoundException(`${userNotFound}`);
    } else {
      return await this.usersService.update(req.user.id, user);
    }
  }

  @Get('me/wishes')
  async viewCurrentUsersWishes(@Req() req): Promise<Wish[]> {
    if (!req.user) {
      throw new NotFoundException(`${userNotFound}`);
    } else {
      return await this.usersService.findWishes(req.user.id);
    }
  }

  @Get(':username/wishes')
  async viewUsersWishes(@Param('username') username: string): Promise<Wish[]> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`${userNotFound}`);
    } else {
      return await this.usersService.findWishes(user.id);
    }
  }

  @Get(':username')
  async viewOthersProfile(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`${userNotFound}`);
    } else {
      return user;
    }
  }

  @Post('find')
  async findUserByEmailOrUsername(@Body() { query }): Promise<User[]> {
    return this.usersService.find(query);
  }
}
