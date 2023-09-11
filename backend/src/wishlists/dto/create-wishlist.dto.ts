import { IsArray, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @Length(0, 250)
  name: string;

  @Length(0, 1500)
  description: string;

  @IsUrl()
  image: string;

  @IsArray()
  itemsId: number[];
}
