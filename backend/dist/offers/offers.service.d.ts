import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';
import { CreateOfferDto } from './dto/create-offer.dto';
export declare class OffersService {
    private offerRepository;
    private wishesRepository;
    constructor(offerRepository: Repository<Offer>, wishesRepository: WishesService);
    findAll(): Promise<Offer[]>;
    findOne(id: number): Promise<Offer>;
    create(user: User, offer: any): Promise<CreateOfferDto>;
}
