import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    findAll(): Promise<Offer[]>;
    findOne(id: number): Promise<Offer>;
    create(req: any, { itemId, amount, hidden }: {
        itemId: any;
        amount: any;
        hidden: any;
    }): Promise<CreateOfferDto>;
}
