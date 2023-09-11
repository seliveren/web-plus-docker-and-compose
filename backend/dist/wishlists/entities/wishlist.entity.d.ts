import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
export declare class Wishlist {
    id: number;
    owner: User;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    image: string;
    items: Wish[];
}
