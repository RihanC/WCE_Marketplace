# WCE Marketplace

WCE Marketplace is a full-stack web application built using Node.js, Express, and MongoDB. It allows users to browse, create, edit, and delete marketplace listings. The application includes user authentication, image uploads, and server-side data validation.

## 💻 Tech Stack

### Core Technologies
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.

### Frontend & Views
- **EJS (Embedded JavaScript)**: Templating language to generate HTML markup with plain JavaScript.
- **ejs-mate**: Layout, partial and block template functions for the EJS template engine.

### Authentication & Security
- **Passport.js**: Authentication middleware for Node.js.
- **passport-local**: Local username and password authentication strategy.
- **passport-local-mongoose**: Mongoose plugin that simplifies building username and password login with Passport.

### File Handling & Storage
- **Cloudinary**: Cloud service for image and video management.
- **Multer**: Middleware for handling `multipart/form-data`, used for uploading files.
- **multer-storage-cloudinary**: Multer storage engine for Cloudinary.

### Utilities & Middleware
- **Joi**: Powerful schema description language and data validator for JavaScript.
- **express-session**: Simple session middleware for Express.
- **connect-flash**: Flash message middleware for Express.
- **dotenv**: Module that loads environment variables from a `.env` file.
- **method-override**: Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it (like HTML forms).

---

## ✨ Features

- **User Authentication**: Secure user registration, login, and logout functionality.
- **Listing Management**: Users can create, read, update, and delete (CRUD) their own marketplace listings.
- **Image Uploads**: Seamless image uploading for listings, securely stored in Cloudinary.
- **Authorization**: Restricts certain actions (like editing or deleting a listing) only to the listing owner.
- **Data Validation**: Server-side validation of user input and listing data using Joi schemas to ensure data integrity.
- **Flash Messages**: Interactive success and error notifications using connect-flash.
- **Session Management**: Persistent user sessions.
- **Responsive Error Handling**: Custom error classes and global error handling middleware for better debugging and user experience.

---

## 🛣️ REST API Routes

Here are all the API endpoints and routes used in the project:

### Global Routes
| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Redirects to `/listings` |

### User Routes (`/`)
| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/signup` | Renders the signup form |
| `POST` | `/signup` | Processes the new user registration |
| `GET` | `/login` | Renders the login form |
| `POST` | `/login` | Authenticates the user and logs them in |
| `GET` | `/logout` | Logs out the current user and clears the session |

### Listing Routes (`/listings`)
| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/listings` | Displays all marketplace listings |
| `POST` | `/listings` | Creates a new listing (requires login) |
| `GET` | `/listings/new` | Renders the form to create a new listing (requires login) |
| `GET` | `/listings/my` | Displays listings owned by the logged-in user |
| `GET` | `/listings/:id` | Shows detailed information for a specific listing |
| `PATCH`| `/listings/:id` | Updates a specific listing (requires login & ownership) |
| `DELETE`| `/listings/:id` | Deletes a specific listing (requires login & ownership) |
| `GET` | `/listings/:id/edit`| Renders the edit form for a specific listing (requires login & ownership) |
