## API Routes

### User Routes

- **GET** `http://localhost:4000/api/v1/user/` - Get all users
  - **Handler**: `getAllUsers`
  
- **POST** `http://localhost:4000/api/v1/user/signup` - Sign up a new user
  - **Handler**: `userSignUp`
  - **Middleware**: `validate(signUpValidator)`

- **POST** `http://localhost:4000/api/v1/user/login` - Log in an existing user
  - **Handler**: `userLogin`
  - **Middleware**: `validate(loginValidator)`

- **GET** `http://localhost:4000/api/v1/user/auth-status` - Check authentication status of a user
  - **Handler**: `verifyUser`
  - **Middleware**: `verifyToken`

- **GET** `http://localhost:4000/api/v1/user/logout` - Log out the current user
  - **Handler**: `userLogout`
  - **Middleware**: `verifyToken`

- **POST** `http://localhost:4000/api/v1/user/update-profile` - Update user profile
  - **Handler**: Inline response with `req.body`
  - **Middleware**: `verifyToken`
