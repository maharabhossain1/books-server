import { IsDefined, IsNotEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ShareBooks } from "./ShareBooks";
import { User } from "./User";

@Entity("books")
export class Books extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  @IsNotEmpty()
  user_id: number;

  @Column()
  @IsDefined()
  @IsNotEmpty()
  book_name: string;

  @Column()
  author_name: string;

  @Column()
  category: string;

  // making relations with the users table
  @ManyToOne(() => User, (user) => user.books, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  // making a relation with share Books table
  @OneToMany(() => ShareBooks, (item) => item.book)
  share: ShareBooks[];

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
