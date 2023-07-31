# Welcome

To the backend side of onlytext!



### Current Dev Notes:

---

`config/`:
- Purpose: This directory is for managing environment configurations and storing variables related to your application's configuration, such as database connection strings, API keys, and other settings.
- File: `env.js`
    - Purpose: This file contains environment-related variables, which are read from the .env file using the dotenv library. It exports these variables, making them accessible in other parts of the application.

`models/`:
- Purpose: This directory is for defining database models using Mongoose schemas. Each model corresponds to a collection in your MongoDB database and represents the structure and behavior of the data.
- File: `user.js`
    - Purpose: This file defines the User model using a Mongoose schema. It includes fields such as username and password and uses pre-save middleware to hash the password before saving it to the database.

`routes/`:
- Purpose: This directory is for defining the routes of your Express application. Each file in this directory represents a group of related routes. For instance, you can have a separate file for user-related routes, product-related routes, etc.
- File: `userRoutes.js`
    - Purpose: This file defines the routes related to user authentication and information retrieval. It specifies the HTTP methods, paths, and corresponding controller functions for each route.

`controllers/`:
- Purpose: This directory is for organizing the controller functions that handle the logic for each route. Controllers interact with models, perform business logic, and return responses to the client.
- File: `userController.js`
    - Purpose: This file contains the controller functions for user-related routes like register, login, logout, and getUser. It interacts with the User model and performs necessary actions based on the incoming requests.

`middlewares/`:
- Purpose: This directory is for storing custom middleware functions that can be applied to specific routes or the entire application. Middleware functions are used for tasks such as authentication, data validation, and error handling.
- File: `authentication.js`
    - Purpose: This file contains the custom middleware function authenticateToken used to verify JWT tokens sent with requests to protected routes. It ensures that only authenticated users can access certain endpoints.

`utils/`:
- Purpose: This directory is for housing utility functions that are used across different parts of the application. These functions can provide common functionality like hashing passwords, working with JWTs, etc.
- File: `jwt.js`
    - Purpose: This file contains utility functions related to JWT management, such as signToken to create JWTs with a payload and verifyToken to validate and decode JWTs.

`server.js`:
- Purpose: This file serves as the entry point for your application. It sets up the Express server, connects to the database, and defines top-level middleware and routes.
    - Note: You may also have other configuration files like app.js or index.js that serve as the entry point. The name can vary depending on your preference.

Future File Placement:

For future functionalities or features of your website, you can create new files in the appropriate directories. For example, if you want to add functionality related to products, you could create a new file in routes/ called productRoutes.js and a corresponding productController.js in the controllers/ directory. If you need additional utilities specific to products, you can create a new file in utils/.
When creating new routes and controllers, make sure to export them and import them in server.js to make them accessible to the application.
Remember to follow the modular structure, and keep related code organized in their respective directories to maintain a clean and organized codebase.

---

- CORS (Cross-Origin Resource Sharing) should be configured at production to allow requests from only specific domains: 

```JavaScript
app.use(
  cors({
    origin: 'https://your-nextjs-frontend-domain.com',
    // You can also add additional options here if needed
  })
);
```

---

Note that storing JWTs in localStorage is a controversial topic and some people advise against it due to the potential for cross-site scripting (XSS) attacks. In a more sophisticated setup, you might want to use HTTP-only cookies to store your JWTs, as these cannot be accessed through JavaScript. Please make sure to do additional research and choose the best method for your use case.