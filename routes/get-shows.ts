// Import required dependencies
import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';

// Create a router instance
const router = Router();

// Load environment variables
dotenv.config();

// Get the Movie DB API key from environment variables
const api_key = process.env.MOVIE_DB_API_KEY;
const getShows = async (_: Request, res: Response) => {
    try {
        const popularResponse = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}`);
        const topRatedResponse = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}`);
        const genres = [10759, 35, 18]; // Sample genre IDs for Action & Adventure, Comedy, Drama

        const genreShows = await Promise.all(
            genres.map(async (genreId) => {
              const response = await axios.get(
                `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=${genreId}`
              );
              return response.data.results;
          })
        );

        const formatShowData = (shows) => {
            return shows.map((show) => ({
                id: show.id,
                title: show.name,
                poster: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'Unknown',
                year: show.first_air_date ? show.first_air_date.slice(0, 4) : 'Unknown',
                genre: 'Unknown',
                description: show.overview || ''
            }));
        };

        const responseData = {
            popularShows: formatShowData(popularResponse.data.results),
            topRatedShows: formatShowData(topRatedResponse.data.results),
            genreShows: genreShows.map((genreList) => formatShowData(genreList))
        };

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching TV show data' });
    }
}

// Defining a route for logging in a mod or tutor using the login function
router.get('/', getShows)

// Exporting the router as default
export default router