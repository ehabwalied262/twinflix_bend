// Importing the required modules
import { Request, Response, Router } from "express";
import { isEmpty, validate } from "class-validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"

// Importing the User entity
import { User } from "../src/entities/User";
// Importing the auth middleware
import auth from "../src/middleware/auth"

import { getFirstInitial  } from "../utils/getFirstInitial"

// Defining a function to register a new User
const register = async (req: Request, res: Response) => {
    // Getting the User data from the request body
    const {email, username, password} = req.body

    try{
    // Validate data
    
      // Initializing an object to store any errors
      let errors: any = {};
      // Checking if the email or username already exists in the database
      const emailUser = await User.findOne({ where: { email } });
      const usernameUser = await User.findOne({ where: { username } });

      // If email or username is taken, add an error message
      if (emailUser) errors.email = "Email is already taken";
      if (usernameUser) errors.username = "Username is already taken";

      // If there are any errors, return a 400 response with the errors
      if (Object.keys(errors).length > 0)
          return res.status(400).json(errors);

      // Call the function and assign the result to the variable
      const profile_picture_url = getFirstInitial(username);

      // Create the User
      // Using the User constructor with the User data
      const newUser = new User({ email, username, password, profile_picture_url });

      // Validating the User entity using class-validator
      errors = await validate(newUser);
      // If there are any validation errors, return a 400 response with the errors
      if (errors.length > 0) {
          let mappedErrors: any = {};
          errors.forEach((e: any) => {
              const key = e.property;
              const value = Object.entries(e.constraints)[0][1];
              mappedErrors[key] = value;
          });
          return res.status(400).json(mappedErrors);
      }
      
      // Saving the User to the database
      await newUser.save();

      // Return the User as a JSON response
      return res.json(newUser);

  } catch (err) {
      // Logging any unexpected errors to the console
      console.log(err);
      // Returning a 500 response with the error message
      return res.status(500).json(err);
  }
}

// Defining a function to login an existing User
const login = async (req: Request, res: Response) => {
    // Getting the username and password from the request body
    const {username, password} = req.body
    try{
        // Initializing an object to store any errors
        let errors: any = {}

        // Checking if the username or password is empty
        if(isEmpty(username)) errors.username = "Username must not be empty"
        if(isEmpty(password)) errors.password = "Password must not be empty" 
        
        // If there are any errors, return a 400 response with the errors
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors)

        // Finding the User by username in the database
        const user = await User.findOne({ where: { username } })
        
        // If no User is found, return a 404 response with an error message
        if (!User) return res.status(404).json({ error: "User not found" })

        // If no User is found or incorrect password, return a 404 response with an error message
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ password: "Username or password is incorrect" })
        }

        // Generating a JSON web token using jwt and the username and secret key from environment variables
        const token = jwt.sign({ username }, process.env.JWT_SECRET)
            // Setting a cookie with the token using cookie module and some options for security and expiration
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400,
                path: '/'
            }) 
        
            // Returning the User as a JSON response
            return res.json( {user , token} )
}               catch(err){
            // Logging any unexpected errors to the console
            console.log(err)
            // Returning a 500 response with the error message
            return res.status(500).json(err)
        }
        }
        
        // Define a function to get the current logged-in user using the auth middleware
        export const me = async (_: Request, res: Response) => {
            // Return the user data instead of just the token in the response
            // You can access the user details from res.locals
            return res.json(res.locals.user);
        }
        // Defining a function to logout the current logged in User using auth middleware
        const logout = (_: Request, res: Response) => {
            // Clearing the cookie with the token using cookie module and some options for expiration
            res.set('Set-Cookie', cookie.serialize('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: new Date(0),
                path: '/'
            }))
        
            // Returning a 200 response with a success message
            return res.status(200).json({ success: true })
        }
        
        // Creating a router using express
        const router = Router()
        // Defining the routes for each function with the corresponding HTTP method and path
        router.post('/register', register)
        router.post('/login', login)
        router.get('/me', auth, me)
        router.post('/logout', auth, logout)
        
// Exporting the router as default
export default router
