import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import {
  validateOrReject,
  IsEmail,
  IsDefined,
  MaxLength,
  MinLength,
} from "class-validator";
import { Books } from "./Books";
import { ShareBooks } from "./ShareBooks";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsDefined()
  @MaxLength(50, {
    message: "Title is too long",
  })
  first_name: string;

  @Column({ nullable: false })
  @IsDefined()
  last_name: string;

  @Column({
    unique: true,
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @Column({
    unique: true,
    nullable: false,
  })
  @IsDefined()
  user_name: string;

  @Column({ nullable: false })
  @IsDefined()
  password: string;

  @OneToMany(() => Books, (books) => books.user)
  books: Books[];

  @OneToMany(() => ShareBooks, (shared) => shared.target_user, {
    cascade: true,
  })
  books_shared_with_user: Books[];

  @OneToMany(() => ShareBooks, (shared) => shared.sender, {
    cascade: true,
  })
  books_shared_by_user: Books[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this).catch((errors) => {
      console.log(
        "Promise rejected (validation failed). Errors: ",
        errors.message
      );
    });
  }
}
