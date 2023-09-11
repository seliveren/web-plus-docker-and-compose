import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';
import {
  noMoreOffers,
  offerNotAllowed,
  offerNotFound,
  offersNotFound,
} from '../utils/constants';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesRepository: WishesService,
  ) {}

  async findAll(): Promise<Offer[]> {
    const offers = await this.offerRepository.find({
      relations: {
        owner: true,
        item: true,
      },
    });
    if (!offers) {
      throw new NotFoundException(`${offersNotFound}`);
    }
    return offers;
  }

  async findOne(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        owner: true,
        item: true,
      },
    });
    if (!offer) {
      throw new NotFoundException(`${offerNotFound}`);
    }
    return offer;
  }

  async create(user: User, offer): Promise<CreateOfferDto> {
    offer.user = user;
    offer.item = offer.itemId;
    const wish = await this.wishesRepository.findOne(offer.item);
    const donatedAfterOffer = wish.raised + offer.amount;

    if (user.id === wish.owner.id) {
      throw new BadRequestException(`${offerNotAllowed}`);
    }

    if (donatedAfterOffer > wish.price) {
      throw new BadRequestException(`${noMoreOffers}`);
    }

    wish.raised = wish.raised + offer.amount;
    await this.wishesRepository.update(offer.item, wish);
    return this.offerRepository.save(offer);
  }
}
