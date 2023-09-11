import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';
import { wishlistNotFound, wishlistsNotFound } from '../utils/constants';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishDto } from '../wishes/dto/update-wish.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private wishesRepository: WishesService,
  ) {}

  async findOne(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        owner: true,
        items: true,
      },
    });
    if (!wishlist) {
      throw new NotFoundException(`${wishlistNotFound}`);
    }
    return wishlist;
  }

  async findAll(): Promise<Wishlist[]> {
    const wishlists = await this.wishlistRepository.find();
    if (!wishlists) {
      throw new NotFoundException(`${wishlistsNotFound}`);
    }
    return wishlists;
  }

  async createWishlist(user: User, wishlist): Promise<CreateWishlistDto> {
    const fullItemsInfo = [];
    for (const el of wishlist.itemsId) {
      const wish = await this.wishesRepository.findOne(el);
      fullItemsInfo.push(wish);
    }
    wishlist.owner = user;
    wishlist.items = fullItemsInfo;
    return this.wishlistRepository.save(wishlist);
  }

  async update(
    id: number,
    wishlist: Partial<Wishlist>,
  ): Promise<UpdateWishDto> {
    wishlist.updatedAt = new Date();
    await this.wishlistRepository.update(id, wishlist);
    return this.wishlistRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.wishlistRepository.delete(id);
  }
}
