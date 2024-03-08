import { Entity as TOEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User"; // Assuming you have a User entity defined
import { Post } from "./Post"; // Assuming you have a Post entity defined
import Entity from "./Entity";

@TOEntity("comments")
export class Comment extends Entity {
    constructor(comment?: Partial<Comment>) {
        super()
        Object.assign(this, comment)
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string; // Text content of the comment

    @Column()
    image: string; // URL or path to the image associated with the comment

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    time: Date; // Timestamp when the comment was created

    @ManyToOne(() => User, user => user.comments)
    user: User; // User who posted the comment

    @ManyToOne(() => Post, post => post.comments)
    post: Post; // Post to which the comment belongs

    @Column()
    likes: number; // Number of likes on the comment

    // Other fields and methods as needed
}