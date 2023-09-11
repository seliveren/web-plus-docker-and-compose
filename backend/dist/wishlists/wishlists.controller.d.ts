import { WishlistsService } from './wishlists.service';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    findAll(): Promise<Wishlist[]>;
    createWishlist(req: any, wishlist: Wishlist): Promise<CreateWishlistDto>;
    update(req: any, id: number, wishlist: Wishlist): Promise<UpdateWishlistDto>;
    remove(req: any, id: number): Promise<any>;
    findOne(id: number): Promise<Wishlist>;
}
