import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthoriseUserDto } from '../users/dto/authorise-user.dto';
import { ValidateUserDto } from '../users/dto/validate-user.dto';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    auth(user: User): Promise<AuthoriseUserDto>;
    validatePassword(username: string, password: string): Promise<ValidateUserDto>;
}
