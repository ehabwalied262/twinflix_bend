// Import required dependencies
import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import { User } from '../src/entities/User';
import { Post } from '../src/entities/Post';
import auth from '../src/middleware/auth';

// Create a router instance
const router = Router();

// Load environment variables
dotenv.config();

// Get the Movie DB API key from environment variables
const addPost = async (req: Request, res: Response) => {
    try {
        const { username, type, content, image, tags } = req.body;
        
        // Find the user based on the provided username
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new post for the user
        const newPost = new Post();
        newPost.user = user;
        newPost.type = type;
        newPost.content = content;
        newPost.image = image;
        newPost.tags = tags;

        await newPost.save();

        return res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while creating the post' });
    }
}

// Defining a route for logging in a mod or tutor using the login function
router.post('/', auth, addPost)

// Exporting the router as default
export default router