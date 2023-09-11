import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthoriseUserDto } from '../users/dto/authorise-user.dto';
export declare class AuthController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    signin(req: any): Promise<AuthoriseUserDto>;
    signup(user: any): Promise<AuthoriseUserDto>;
}
