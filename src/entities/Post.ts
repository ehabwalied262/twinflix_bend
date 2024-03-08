import { Entity as TOEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User"; // Assuming you have a User entity defined
import { Comment } from "./Comment";
import Entity from "./Entity";

@TOEntity("posts")
export class Post extends Entity {
    constructor(post?: Partial<Post>) {
        super()
        Object.assign(this, post)
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string; // Type of post (e.g., Reviews, Memes, Recommendations)

    @Column()
    content: string; // Actual text content of the post

    @Column()
    image: string; // URL or path to the image associated with the post

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    time: Date; // Timestamp when the post was created/updated

    @ManyToOne(() => User, user => user.posts)
    user: User; // User entity to associate each post with the user who created it

    @Column()
    likes: number = 0; // Initialize the likes field with a default value of 0
    
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]; // Array of comments associated with the post

    @Column()
    tags: string; // Tags or categories associated with the post

    // @Column()
    // visibility: string; // Visibility status of the post (e.g., public, private)

    // @Column()
    // status: string; // Status of the post (e.g., draft, published)

    @ManyToOne(() => Post, post => post.retweets, { nullable: true })
    originalPost: Post; // Represents the original post being retweeted

    @OneToMany(() => Post, post => post.originalPost)
    retweets: Post[]; // All posts that are retweets of the current post

    // Other fields and methods as needed
}