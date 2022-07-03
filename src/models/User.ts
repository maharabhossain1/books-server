import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
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
  IsNotEmpty,
} from "class-validator";
import { Books } from "./Books";
import { ShareBooks } from "./ShareBooks";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsDefined()
  @IsNotEmpty()
  first_name: string;

  @Column({ nullable: false })
  @IsDefined()
  @IsNotEmpty()
  last_name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @Column({
    unique: true,
    nullable: false,
  })
  @IsDefined()
  @IsNotEmpty()
  user_name: string;

  @Column({ nullable: false })
  @IsDefined()
  @IsNotEmpty()
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

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this).catch((errors) => {
      console.log("Promise rejected (validation failed). Errors: ", errors);
    });
  }
}
