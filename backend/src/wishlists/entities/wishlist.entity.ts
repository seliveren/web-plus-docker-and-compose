import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @CreateDateColumn({ default: () => 'NOW()' })
  createdAt: Date;

  @CreateDateColumn({ default: () => 'NOW()' })
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column({ default: ' ' })
  @Length(0, 1500)
  description: string;

  @Column()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.name)
  @JoinTable()
  items: Wish[];
}
