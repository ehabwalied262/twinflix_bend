import express from "express";
import authRoutes from "../routes/auth";
import getMovies from "../routes/get-movies";
import getShows from "../routes/get-shows";
import getAnimes from "../routes/get-animes";
import getMovie from "../routes/get-movie";
import getShow from "../routes/get-show";
import getAnime from "../routes/get-anime";
import getUserAnimes from "../routes/get-user-animes";
import getUserFriends from "../routes/get-user-friends";
import getUserMatches from "../routes/get-user-matches";
import getUserMovies from "../routes/get-user-movies";
import getUserShows from "../routes/get-user-shows";
import addMovie from "../routes/add-movie";
import addShow from "../routes/add-show";
import addAnime from "../routes/add-anime";
import addPost from "../routes/add-post";
import getUserPosts from "../routes/get-user-posts";

const router = express.Router();

// Mount your routes
router.use("/auth", authRoutes)
router.use("/get-movies", getMovies)
router.use("/get-shows", getShows)
router.use("/get-animes", getAnimes)
router.use("/get-movie", getMovie)
router.use("/get-show", getShow)
router.use("/get-anime", getAnime)
router.use("/get-user-animes", getUserAnimes)
router.use("/get-user-friends", getUserFriends)
router.use("/get-user-matches", getUserMatches)
router.use("/get-user-movies", getUserMovies)
router.use("/get-user-shows", getUserShows)
router.use("/add-movie", addMovie)
router.use("/add-show", addShow)
router.use("/add-anime", addAnime)
router.use("/add-post", addPost)
router.use("/get-user-posts", getUserPosts)

export default router;
