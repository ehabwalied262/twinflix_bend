import { Length, Matches  } from "class-validator"
import { Entity as TOEntity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm"
import { emailRegex, passwordRegex, usernameRegex } from "./utils/regExpression"
import bcrypt from "bcrypt"
import { Exclude } from "class-transformer"
import Entity  from "./Entity"

@TOEntity("users")
export class User extends Entity {
    constructor(user?: Partial<User>) {
        super()
        Object.assign(this, user)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Matches(emailRegex, {message: "Email is invalid"})
    @Length(1, 255, {message: 'Email is required'})
    @Column({ unique: true, })
    email: string


    @Index()
    @Matches(usernameRegex, {message: "Username must contain only letters, numbers, dots and underscores, and be between 3 and 20 characters"})
    @Length(3, 255 , { message: "Username must be between 3 and 20 characters" })
    @Column({ unique: true })
    username: string;


    @Exclude()
    @Column()
    @Matches(passwordRegex, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 8 characters long',
      }) 
    @Length(6, 255, {message: "Password must be at least 8 characters long"})
    password: string;

    @Column()
    profile_picture_url: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 6)
    }

}
