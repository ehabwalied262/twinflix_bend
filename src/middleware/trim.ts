// Importing the required modules and types
import { NextFunction, Request, Response } from "express";

// Defining a middleware function to trim any whitespace from the request body
export default (req: Request, res: Response, next: NextFunction ) => {
    // Defining an array of exceptions that should not be trimmed
    const exceptions = ['password']

    // Looping through the keys of the request body
    Object.keys(req.body).forEach((key) => {
        // If the key is not in the exceptions array and the value is a string
        if (!exceptions.includes(key) && typeof req.body[key] === 'string') {
            // Trim any whitespace from the value and assign it back to the request body
            req.body[key] = req.body[key].trim()
        }
    })

    // Calling the next middleware or handler function
    next()
}
