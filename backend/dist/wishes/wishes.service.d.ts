import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { User } from '../users/entities/user.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
export declare class WishesService {
    private wishRepository;
    constructor(wishRepository: Repository<Wish>);
    findOne(id: number): Promise<Wish>;
    findLast(): Promise<Wish[]>;
    findTop(): Promise<Wish[]>;
    findAll(): Promise<Wish[]>;
    createWish(user: User, wish: Wish): Promise<CreateWishDto>;
    copyWish(user: User, wish: Wish): Promise<CreateWishDto>;
    update(id: number, wish: Partial<Wish>): Promise<UpdateWishDto>;
    remove(id: number): Promise<void>;
}
