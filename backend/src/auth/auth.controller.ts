import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './local-auth.guard';
import { UsersService } from '../users/users.service';
import { AuthoriseUserDto } from '../users/dto/authorise-user.dto';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() req): Promise<AuthoriseUserDto> {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() user): Promise<AuthoriseUserDto> {
    await this.usersService.create(user);
    return this.authService.auth(user);
  }
}
