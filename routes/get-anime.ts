// Import required dependencies
import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';

// Create a router instance
const router = Router();

// Load environment variables
dotenv.config();

// Get the Movie DB API key from environment variables
const getAnime = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

// Defining a route for logging in a mod or tutor using the login function
router.get('/', getAnime)

// Exporting the router as default
export default router