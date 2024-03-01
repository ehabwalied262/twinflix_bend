// Importing the AppDataSource module
import { AppDataSource } from "./data-source"

import app from "./app";

// Get the port number from environment variables
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} 🖖🚀`);
  });

// Initializing the AppDataSource and handling any errors
AppDataSource.initialize()
    .then(async() => {
        console.log("Data Source has been initialized! 🚀🖖")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

