### Problem Statement: Mini Full-Stack App

#### Overview:
You are required to develop a mini full-stack application using React for the frontend and Node.js, Express, and MongoDB for the backend. The application should implement authentication and authorization features (JWT-based access and refresh tokens as optional). The project will be structured into two separate repositories for the frontend and backend, each with thorough documentation.

---

### Frontend Requirements (React):

1. **User Interface**:
   - Create a React-based frontend with the following features:
     - **Login and Signup pages**: Forms for user registration and login.
     - **CRUD Interface**: Display a list of products with options to **Create, Read, Update, and Delete (CRUD)** products.
     - **Access Control**: Only authenticated users can create, update, or delete products.
     - Display error messages on failed login, invalid token, or other authentication errors.
  
2. **API Integration**:
   - Use `axios` or `fetch` to communicate with the backend API, including sending tokens for authenticated requests.
   - Implement token management (store JWT access token, and optionally refresh token) using **localStorage** or **cookies**.
   - **Optional**: Implement automatic token refresh using the refresh token flow.

3. **State Management**:
   - Use React’s `useState` and `useEffect` hooks to manage state, or alternatively use a state management library like **Redux**.
   - Ensure authentication status is managed globally to restrict unauthorized access to certain pages or actions.

4. **Routing**:
   - Use `react-router` to handle protected routes (e.g., users should not be able to access the products page without logging in).
   - Redirect to login page if the user is not authenticated.

5. **Styling**:
   - Ensure the layout is user-friendly and responsive. Use any styling libraries or frameworks like **Material-UI**, **Bootstrap**, or **CSS**.

6. **Bonus Features (Optional)**:
   - Implement a **"Remember Me"** option on the login page.
   - Display the current user's profile with an option to log out.
   - **Form validation** for login, registration, and product management.

---

### Backend Requirements (Node.js, Express, MongoDB):

1. **API Development**:
   - Build a **RESTful API** using **Node.js** and **Express** that includes:
     - `GET /api/products`: Fetch a list of products (public access).
     - `POST /api/products`: Create a new product (authenticated users only).
     - `PUT /api/products/:id`: Update an existing product (authenticated users only).
     - `DELETE /api/products/:id`: Delete a product (authenticated users only).
   - Use **Mongoose** to define models and manage product data.
   - Protect sensitive routes (create, update, delete) using authentication middleware.

2. **Authentication and Authorization**:
   - Implement **user registration** and **login** functionality:
     - `POST /api/auth/signup`: Register a new user with hashed passwords.
     - `POST /api/auth/login`: Authenticate user and return a JWT access token.
   - Use **JWT (JSON Web Tokens)** to protect routes:
     - Attach the token to protected routes (like creating, updating, and deleting products).
     - Create middleware to verify the token and authorize users.
   - **Optional**: Implement **refresh tokens** to automatically renew access tokens when they expire.
     - `POST /api/auth/token`: Refresh the access token using the refresh token.
     - Implement token expiration strategies (e.g., short lifespan for access tokens, long lifespan for refresh tokens).

3. **Database**:
   - Set up **MongoDB** with **Mongoose** for managing user and product data.
   - Ensure proper relationships between users and products (e.g., products created by specific users).

4. **Error Handling**:
   - Implement proper error handling, ensuring that errors such as authentication failures or invalid token errors are correctly handled and reported with appropriate status codes.
   - Return meaningful responses for all API requests (e.g., 401 Unauthorized for protected routes without tokens, 404 Not Found for invalid product IDs).

5. **Bonus Features (Optional)**:
   - Implement user role management, such as admin users who can manage all products and regular users who can only manage their own products.
   - Add pagination, search, and filter functionality for large datasets in the product list.

---

### Documentation Requirements:

1. **Frontend (React)**:
   - **Setup Instructions**: Provide clear steps for setting up the frontend project, including required dependencies (`npm install`) and how to start the application (`npm start`).
   - **Code Structure**: Explain the main components, state management logic, API service integration (how you interact with backend endpoints), and authentication flow (how tokens are handled).
   - **Usage Instructions**: Detail how to:
     - Register and login.
     - Perform CRUD operations (only for authenticated users).
   - **API Endpoints**: List the API endpoints used in the frontend for login, signup, CRUD operations, etc.
   - **Authentication Handling**: Document how authentication and protected routes are implemented (e.g., token storage in localStorage).
   - **Deployment Instructions**: Provide steps to deploy the React app on hosting platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

2. **Backend (Node.js, Express, MongoDB)**:
   - **Setup Instructions**: Include steps for setting up the backend project, installing dependencies (`npm install`), and running the app (`npm start`). 
   - **Environment Variables**: List and explain the required environment variables (e.g., MongoDB URI, JWT secret).
   - **API Documentation**: Provide detailed documentation for each API endpoint, including:
     - URL and HTTP methods (GET, POST, PUT, DELETE).
     - Expected request body (e.g., for login or creating a product).
     - Example responses (success and error cases).
   - **Authentication and Authorization**: Clearly explain how JWT is used to secure routes, how to refresh tokens (if implemented), and how users are authorized for CRUD operations.
   - **Deployment Instructions**: Provide steps to deploy the backend on platforms like **Render**, **Railway**, or **Glitch**.
   - **Bonus Documentation (Optional)**: Document any extra features such as role-based access control (admin, user) or additional middleware for token validation.

---

### Optional Advanced Features:
1. **JWT Access and Refresh Tokens**:
   - Explain how you generate JWT tokens (access and refresh).
   - Include a flowchart or diagram to demonstrate how the token refresh cycle works.
   - Include detailed steps in the backend repository’s documentation to explain the refresh token endpoint (`/auth/token`), token expiration logic, and how clients should handle expired tokens.

2. **Role-based Authorization**:
   - Document user roles and how the backend restricts actions based on roles (e.g., admin can access all routes, users can only access their products).

---
