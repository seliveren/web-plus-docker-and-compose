import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    viewProfile(req: any): Promise<User>;
    editProfile(req: any, user: User): Promise<UpdateUserDto>;
    viewCurrentUsersWishes(req: any): Promise<Wish[]>;
    viewUsersWishes(username: string): Promise<Wish[]>;
    viewOthersProfile(username: string): Promise<User>;
    findUserByEmailOrUsername({ query }: {
        query: any;
    }): Promise<User[]>;
}
