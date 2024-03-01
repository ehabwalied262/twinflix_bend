// Importing the required modules and types
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../entities/User";

// Defining a middleware function to check the authentication of the request
export default async (req: Request, res: Response, next: NextFunction) => {
    try{
        // Getting the token from the request cookie
        const token = req.cookies.token
        console.log("TOKEN IS " + token)
        // If there is no token, throw an error
        if(!token) throw new Error('Unauthenticated')
        
        // Verifying the token using jwt and getting the username from the payload
        const { username }: any = jwt.verify(token, process.env.JWT_SECRET)

        // Finding the user by username in the database
        const user = await User.findOne({ where: { username }})

        // If no user is found, throw an error
        if(!user) throw new Error('Unauthenticated')

        // Storing the user in res.locals for later use
        res.locals.user = user

        // Calling the next middleware or handler function
        return next()
    }   catch(err){
        // Logging any unexpected errors to the console
        console.log(err)
        // Returning a 401 response with an error message
        return res.status(401).json({error: 'Unauthenticated'})
    }
}
