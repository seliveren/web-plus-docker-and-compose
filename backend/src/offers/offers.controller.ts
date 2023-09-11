import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtGuard } from '../auth/jwt-auth.guard';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  async findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Offer> {
    return this.offersService.findOne(id);
  }

  @Post()
  async create(
    @Req() req,
    @Body() { itemId, amount, hidden },
  ): Promise<CreateOfferDto> {
    const offer = { itemId, amount, hidden };
    return this.offersService.create(req.user, offer);
  }
}
