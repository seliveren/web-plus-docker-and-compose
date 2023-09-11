import { IsNotEmpty } from 'class-validator';

export class AuthoriseUserDto {
  @IsNotEmpty()
  access_token: string;
}
