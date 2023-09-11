import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from '../wishes/entities/wish.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne(id: number): Promise<User>;
    find(param: string): Promise<User[]>;
    findByUsername(username: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(user: CreateUserDto): Promise<CreateUserDto>;
    update(id: number, user: Partial<UpdateUserDto>): Promise<UpdateUserDto>;
    findWishes(id: number): Promise<Wish[]>;
}
