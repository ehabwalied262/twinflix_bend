import express from "express";
import authRoutes from "../routes/auth";
import getMovies from "../routes/get-movies";

const router = express.Router();

// Mount your routes
router.use("/auth", authRoutes)
router.use("/get-movies", getMovies)

export default router;
