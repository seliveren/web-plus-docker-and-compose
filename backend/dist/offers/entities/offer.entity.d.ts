import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
export declare class Offer {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
    item: Wish;
    amount: number;
    hidden: boolean;
}
