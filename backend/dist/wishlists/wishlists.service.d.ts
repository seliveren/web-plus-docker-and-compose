import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishDto } from '../wishes/dto/update-wish.dto';
export declare class WishlistsService {
    private wishlistRepository;
    private wishesRepository;
    constructor(wishlistRepository: Repository<Wishlist>, wishesRepository: WishesService);
    findOne(id: number): Promise<Wishlist>;
    findAll(): Promise<Wishlist[]>;
    createWishlist(user: User, wishlist: any): Promise<CreateWishlistDto>;
    update(id: number, wishlist: Partial<Wishlist>): Promise<UpdateWishDto>;
    remove(id: number): Promise<void>;
}
