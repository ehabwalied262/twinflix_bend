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

const getMovies = async (req: Request, res: Response) => {
    try {
        const popularResponse = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
        const topRatedResponse = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`);
        const genres = [28, 35, 18]; // Sample genre IDs for Action, Comedy, Drama

        const genreMovies = await Promise.all(
            genres.map(async (genreId) => {
              const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreId}`
              );
              return response.data.results;
          })
        );

        const formatMovieData = (movies) => {
            return movies.map((movie) => ({
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'Unknown',
                year: movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown',
                genre: 'Unknown',
                description: ''
            }));
        };

        const responseData = {
            popularMovies: formatMovieData(popularResponse.data.results),
            topRatedMovies: formatMovieData(topRatedResponse.data.results),
            genreMovies: genreMovies.map((genreList) => formatMovieData(genreList))
        };

        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching movie data' });
    }
}

// Defining a route for logging in a mod or tutor using the login function
router.get('/', getMovies)

// Exporting the router as default
export default router