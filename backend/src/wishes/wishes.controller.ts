import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { JwtGuard } from '../auth/jwt-auth.guard';
import {
  priceEditAfterOffersNotAllowed,
  wishDeletionNotAllowed,
  wishEditNotAllowed,
} from '../utils/constants';
import { UpdateWishDto } from './dto/update-wish.dto';
import { CreateWishDto } from './dto/create-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  async findLast(): Promise<Wish[]> {
    return this.wishesService.findLast();
  }

  @Get('top')
  async findTop(): Promise<Wish[]> {
    return this.wishesService.findTop();
  }

  @Get()
  async findAll(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() wish: Wish): Promise<CreateWishDto> {
    return this.wishesService.createWish(req.user, wish);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get(':id')
  async findWishByID(@Req() req, @Param('id') id: number): Promise<Wish> {
    return this.wishesService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() wish: Wish,
  ): Promise<UpdateWishDto> {
    const wishToBeUpdated = await this.wishesService.findOne(id);
    if (wishToBeUpdated.owner.id === req.user.id) {
      if (wish.price && wishToBeUpdated.raised > 0) {
        throw new BadRequestException(`${priceEditAfterOffersNotAllowed}`);
      } else {
        return this.wishesService.update(id, wish);
      }
    } else {
      throw new BadRequestException(`${wishEditNotAllowed}`);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number): Promise<any> {
    const wish = await this.wishesService.findOne(id);
    if (wish.owner.id === req.user.id) {
      return await this.wishesService.remove(id);
    } else {
      throw new BadRequestException(`${wishDeletionNotAllowed}`);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(@Req() req, @Param('id') id: number): Promise<any> {
    const wish = await this.wishesService.findOne(id);
    return this.wishesService.copyWish(req.user, wish);
  }
}
