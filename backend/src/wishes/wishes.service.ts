import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { User } from '../users/entities/user.entity';
import { wishesNotFound, wishNotFound } from '../utils/constants';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        owner: true,
      },
    });
    if (!wish) {
      throw new NotFoundException(`${wishNotFound}`);
    } else {
      return wish;
    }
  }

  async findLast(): Promise<Wish[]> {
    const wishes = await this.wishRepository.find({
      order: { createdAt: 'desc' },
      take: 40,
    });
    if (!wishes) {
      throw new NotFoundException(`${wishesNotFound}`);
    } else {
      return wishes;
    }
  }

  async findTop(): Promise<Wish[]> {
    const wishes = await this.wishRepository.find({
      order: { copied: 'desc' },
      take: 20,
    });
    if (!wishes) {
      throw new NotFoundException(`${wishesNotFound}`);
    } else {
      return wishes;
    }
  }

  async findAll(): Promise<Wish[]> {
    const wishes = this.wishRepository.find();
    if (!wishes) {
      throw new NotFoundException(`${wishesNotFound}`);
    } else {
      return wishes;
    }
  }

  async createWish(user: User, wish: Wish): Promise<CreateWishDto> {
    wish.owner = user;
    wish.raised = 0;
    wish.copied = 0;
    return this.wishRepository.save(wish);
  }

  async copyWish(user: User, wish: Wish): Promise<CreateWishDto> {
    const wishToBeCopied = await this.wishRepository.findOne({
      where: { id: wish.id },
    });
    wishToBeCopied.copied = wish.copied + 1;
    await this.wishRepository.update(wish.id, wishToBeCopied);

    const { id, createdAt, updatedAt, offers, ...rest } =
      await this.wishRepository.findOne({
        where: { id: wish.id },
      });

    return this.wishRepository.save({
      ...rest,
      raised: 0,
      copied: 0,
      owner: user,
    });
  }

  async update(id: number, wish: Partial<Wish>): Promise<UpdateWishDto> {
    const wishUpdated = await this.wishRepository.findOne({ where: { id } });
    if (!wish) {
      throw new NotFoundException(`${wishNotFound}`);
    } else {
      wish.updatedAt = new Date();
      await this.wishRepository.update(id, wish);
      return wishUpdated;
    }
  }

  async remove(id: number): Promise<void> {
    const wishToBeDeleted = this.wishRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!wishToBeDeleted) {
      throw new NotFoundException(`${wishNotFound}`);
    } else {
      await this.wishRepository.delete(id);
    }
  }
}
