import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Books } from "./Books";
import { User } from "./User";

@Entity("shareBooks")
export class ShareBooks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //  relations with the BOOKS TABLE

  @Column()
  book_id: number;
  @ManyToOne(() => Books, (books) => books.share, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "book_id",
  })
  book: Books;

  // relation with USER TABLE who shared the books
  @Column()
  sender_id: number;
  @ManyToOne(() => User, (user) => user.books_shared_by_user, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "sender_id",
  })
  sender: User;

  // relation with USER TABLE  whom to share the book
  @Column()
  target_user_id: number;
  @ManyToOne(() => User, (user) => user.books_shared_with_user, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "target_user_id",
  })
  target_user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
