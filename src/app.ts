// Import required modules
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import trim from "./middleware/trim";
import router from "./routes";
// Importing the cookie-parser module
import cookieParser from 'cookie-parser'


const app = express();

// Load environment variables from .env file
dotenv.config();

// Set up middleware functions for the app
app.use(express.json()); // Parse JSON requests
app.use(trim); // Use the trim middleware for all routes
// Using the cookie-parser middleware
app.use(cookieParser())
app.use(morgan("dev")); // Log requests in development mode
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Mount the routes
app.use("/api", router);

export default app;
