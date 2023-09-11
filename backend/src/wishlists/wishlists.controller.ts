import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { Wishlist } from './entities/wishlist.entity';
import { JwtGuard } from '../auth/jwt-auth.guard';
import {
  wishlistDeletionNotAllowed,
  wishlistEditNotAllowed,
} from '../utils/constants';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Post()
  async createWishlist(
    @Req() req,
    @Body() wishlist: Wishlist,
  ): Promise<CreateWishlistDto> {
    return this.wishlistsService.createWishlist(req.user, wishlist);
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() wishlist: Wishlist,
  ): Promise<UpdateWishlistDto> {
    const wishlistToBeUpdated = await this.wishlistsService.findOne(id);
    if (wishlistToBeUpdated.owner.id === req.user.id) {
      return this.wishlistsService.update(id, wishlist);
    } else {
      throw new BadRequestException(`${wishlistEditNotAllowed}`);
    }
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number): Promise<any> {
    const wishlist = await this.wishlistsService.findOne(id);
    if (wishlist.owner.id === req.user.id) {
      return this.wishlistsService.remove(id);
    } else {
      throw new BadRequestException(`${wishlistDeletionNotAllowed}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wishlist> {
    return await this.wishlistsService.findOne(id);
  }
}
