# Unicorn Server

This server is part of the "Unicorn Server" project. It uses Node.js, Express and MongoDB for query processing and data management.

## Installation and Launch

### Step 1: Cloning the repository

First clone the repository to your local device:

```bash
git clone https://github.com/vlad-burthev/unicorn-server.git
cd electricity-market-server
```

### Step 2: Install Dependencies

Use npm to install all required dependencies:

```bash
npm install
```

### Step 3: Setting Environment Variables

Create a .env file in the project root directory and add the following environment variables:

```bash
PORT="your_port"
CONNECT_STRING="your_connection_string_to_mongodb"
SECRET_KEY="your_secret_key"
```

The server will be launched on the port specified in the PORT environment variable.

# Project structure

- controllers/
  - electricityProvidersController.js - controller for electricity providers
  - userController.js - controller for users
- dto/
  - electricityProvidersDto.js - DTO for electricity suppliers
  - userDto.js - DTO for users
- error/
  - ApiError.js - API error handling
- middleware/
  - checkAuthMiddleware.js - middleware for checking authorization
  - errorHandlingMiddleware.js - middleware for error handling
- routes/
  - router.js - main router
  - electricityProvidersRouter.js - routes for electricity providers
  - userRouter.js -routes for users
- schemas/
  - electricityProvidersSchema.js - scheme for electricity providers
  - userSchema.js - scheme for users
- .env - environment variable file
- .gitignore - file to exclude files from git
- index.js - main server file
- package.json - file with project description and dependencies
- package-lock.json - file with project description and dependencies

# Routes

### Primary router

- File: routes/router.js
  - /user - routes for users (uses userRouter)
  - /electricity_providers - routes for electricity providers (uses electricityProvidersRouter, protected by checkAuthMiddleware)

### Routes for electricity providers

- File: routes/electricityProvidersRouter.js

  - POST /create - creating a new electricity supplier (uses createElectricityProvidersValidator, createElectricityProvider)
  - GET /get_all -getting all electricity providers (getAllElectricityProvider)
  - GET /get_one/:id - getting one electricity supplier by ID (getOneElectricityProvider)
  - POST /delete/:id - deleting an electricity supplier by ID (deleteElectricityProvider)
  - POST /update/:id - updating electricity supplier data by ID (uses updateElectricityProvidersValidator, updateElectricityProvider)

### Routes for users

- File: routes/userRouter.js

  - POST /registration - registering a new user (uses userValidator, registration)
  - POST /login - user login (uses userValidator, login)
  - POST /check - checking user authorization (uses checkAuthMiddleware, checkAuth)

# API Documentation

## User Endpoints

### Registration

- **URL:** `/user/registration`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Parameters:**
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Expected Response:**
  - **Success:**
    - **Status Code:** 200
    - **Body:** User's email.
  - **Error:**
    - **Status Code:** 400
    - **Body:** Error message.

### Login

- **URL:** `/user/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Parameters:**
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Expected Response:**
  - **Success:**
    - **Status Code:** 200
    - **Body:** User's email.
  - **Error:**
    - **Status Code:** 401
    - **Body:** Error message.

### Check Auth

- **URL:** `/user/check`
- **Method:** `POST`
- **Description:** Checks user's authentication status.
- **Parameters:** None
- **Expected Response:**
  - **Success:**
    - **Status Code:** 200
    - **Body:** User's email.
  - **Error:**
    - **Status Code:** 500
    - **Body:** Error message.

## Electricity Providers Endpoints

### Create Provider

- **URL:** `/electricity_providers/create`
- **Method:** `POST`
- **Description:** Creates a new electricity provider.
- **Parameters:**
  - `name` (string): Provider's name.
  - `country` (string): Provider's country.
  - `marketShare` (number): Provider's market share.
  - `renewableEnergyPercentage` (number): Provider's renewable energy percentage.
  - `yearlyRevenue` (number): Provider's yearly revenue.
- **Expected Response:**
  - **Success:**
    - **Status Code:** 200
    - **Body:** Message and company details.
  - **Error:**
    - **Status Code:** 400
    - **Body:** Error message.

### Get All Providers

- **URL:** `/electricity_providers/get_all`
- **Method:** `GET`
- **Description:** Retrieves all electricity providers.
- **Parameters:** None
- **Expected Response:**
  - **Success:**
    - **Status Code:** 200
    - **Body:** List of providers.
  - **Error:**
    - **Status Code:** 500
    - **Body:** Error message.

### Get One Provider

- **URL:** `/electricity_providers/get_one/:id`
- **Method:** `GET`
- **Description:** Retrieves one electricity provider by ID.
- **Parameters:**
  - `id` (string): Provider's ID.
- **Expected Response:**
  - **Success:**
    - **Status Code:** 200
    - **Body:** Provider details.
  - **Error:**
    - **Status Code:** 400
    - **Body:** Error message.

### Delete Provider

- **URL:** `/electricity_providers/delete/:id`
- **Method:** `POST`
- **Description:** Deletes an electricity provider by ID.
- **Parameters:**
  - `id` (string): Provider's ID.
- **Expected Response:**
  - **Success:**
    - **Status Code:** 200
    - **Body:** Message.
  - **Error:**
    - **Status Code:** 400
    - **Body:** Error message.

### Update Provider

- **URL:** `/electricity_providers/update/:id`
- **Method:** `POST`
- **Description:** Updates an electricity provider's details by ID.
- **Parameters:**
  - `id` (string): Provider's ID.
  - `marketShare` (number): Provider's market share.
  - `renewableEnergyPercentage` (number): Provider's renewable energy percentage.
  - `yearlyRevenue` (number): Provider's yearly revenue.
- **Expected Response:**
  - **Success:**
    - **Status Code:** 200
    - **Body:** Message.
  - **Error:**
    - **Status Code:** 400
    - **Body:** Error message.

# Libraries used

- express
- mongoose
- cors
- cookie-parser
- dotenv
- bcryptjs
- express-validator
- jsonwebtoken
