import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { UpdateWishDto } from './dto/update-wish.dto';
import { CreateWishDto } from './dto/create-wish.dto';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    findLast(): Promise<Wish[]>;
    findTop(): Promise<Wish[]>;
    findAll(): Promise<Wish[]>;
    create(req: any, wish: Wish): Promise<CreateWishDto>;
    findWishByID(req: any, id: number): Promise<Wish>;
    update(req: any, id: number, wish: Wish): Promise<UpdateWishDto>;
    remove(req: any, id: number): Promise<any>;
    copyWish(req: any, id: number): Promise<any>;
}
