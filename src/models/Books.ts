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
  user_id: number;

  @Column()
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
  @OneToMany(() => ShareBooks, (books) => books.book)
  share: ShareBooks[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
