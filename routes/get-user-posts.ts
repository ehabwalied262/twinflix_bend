import { Request, Response, Router } from 'express';
import { AppDataSource } from '../src/data-source';
import { User } from '../src/entities/User';
import { Post } from '../src/entities/Post';
import auth from '../src/middleware/auth';

const router = Router();
const getUserPosts = async (req: Request, res: Response) => {
    try {
         // Extract 'username' from the query parameters and ensure it's a string
     const username = typeof req.query.username === 'string' ? req.query.username : undefined;
     console.log('Username:', username);

     if (!username) {
         console.log('Username must be a string:', req.query.username);
         return res.status(400).json({ error: 'Username must be a string' });
     }

     const UserModel = AppDataSource.getRepository(User);
     const user = await UserModel.findOne({ where: {username: username } });

     if (!user) {
         console.log('User not found for username:', username);
         return res.status(404).json({ error: 'User not found' });
     }

     const UserPostsModel = AppDataSource.getRepository(Post);
     const userPosts = await UserPostsModel.find({ 
         where: { 
             user: { id: user.id } // Use the user's id to filter posts
         },
         relations: ['user']
     });

     console.log('User posts:', userPosts);
     res.status(200).json({ userPosts });

    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching user posts' });
    }
}


router.get('/', auth, getUserPosts)

export default router


