#  ShoppyGlobe API (Backend)

The backend service for the ShoppyGlobe E-commerce application. This RESTful API handles user authentication, product management, and shopping cart operations using **Node.js**, **Express**, and **MongoDB**.

##  Features

* **Authentication:** Secure User Registration and Login using **JWT (JSON Web Tokens)** and **BCrypt** password hashing.
* **Product Management:** Retrieve product lists and single product details from the database.
* **Shopping Cart:** A protected cart system where logged-in users can:
    * Add items to their cart.
    * Update item quantities.
    * Remove items from the cart.
* **Database:** Scalable data modeling with **Mongoose** (User, Product, Cart schemas).
* **Security:** Middleware to protect sensitive routes (Cart) from unauthorized access.

##  Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Atlas or Local)
* **ODM:** Mongoose
* **Authentication:** JSON Web Token (JWT) & bcryptjs
* **Tools:** Dotenv, CORS, Nodemon (Dev)

## Installation & Setup

Follow these steps to run the API locally:

### 1. Clone the Repository
```bash
git clone https://github.com/AtulMishra001/shoppy-globe-backend
cd shoppy-globe-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration
Create a .env file in the root directory and add the following variables:
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

### 4. Start the Server
```bash
npm run dev
```
You should see:
Server running on port 3000 MongoDB Connected... in the console.


### Auth Endpoints

These endpoints are **Public** and do not require a token.

**1. Register a New User**
* **Endpoint:** `POST /api/auth/register`
* **Description:** Creates a new user account.
* **Body (JSON):**
    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```

**2. Login User**
* **Endpoint:** `POST /api/auth/login`
* **Description:** Authenticates a user and returns a JWT Token. **You must copy this token for Cart requests.**
* **Body (JSON):**
    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```
* **Response:**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "userId": "64f1b2..."
    }
    ```

### Product Endpoints

These endpoints are **Public** and can be accessed by anyone.

**1. Get All Products**
* **Endpoint:** `GET /api/products`
* **Description:** Returns a list of all products in the database.
* **Body:** None

**2. Get Single Product**
* **Endpoint:** `GET /api/products/:id`
* **Description:** Returns details for a specific product.
* **Example URL:** `http://localhost:3000/api/products/65c2a1...`
* **Body:** None

###  Cart Endpoints (Protected)

 **Important:** All Cart endpoints require the **Authorization Header**.
* **Key:** `Authorization`
* **Value:** `Bearer <YOUR_TOKEN_HERE>`

**1. Add Item to Cart**
* **Endpoint:** `POST /api/cart`
* **Description:** Adds a product to the logged-in user's cart.
* **Body (JSON):**
    ```json
    {
      "productId": "65c2a18e9...",  // Copy this from the Product List
      "quantity": 1
    }
    ```

**2. Update Item Quantity**
* **Endpoint:** `PUT /api/cart/:productId`
* **Description:** Updates the count of a specific item already in the cart.
* **URL Param:** Replace `:productId` with the actual Product ID.
* **Body (JSON):**
    ```json
    {
      "quantity": 3
    }
    ```

**3. Remove Item from Cart**
* **Endpoint:** `DELETE /api/cart/:productId`
* **Description:** Removes a specific product from the cart completely.
* **URL Param:** Replace `:productId` with the actual Product ID.
* **Body:** None

### Folder Structure

```
shoppy-globe-backend/
├── src/
│   ├── config/         # Database connection logic
│   ├── controllers/    # (Optional) Route logic separation
│   ├── middleware/     # Auth middleware (JWT verification)
│   ├── models/         # Mongoose Schemas (User, Product, Cart)
│   └── routes/         # Express Route definitions
├── .env                # Environment variables (GitIgnored)
├── server.js           # Server entry point
└── package.json        # Project metadata and scripts
```

### Testing

This API has been tested using Thunder Client (VS Code Extension).
1. Register/Login to get a Token.

2. Use the Token in the Headers tab for Cart operations.

3. Check the products endpoint to see the inventory.

[GitHub Link](https://github.com/AtulMishra001/shoppy-globe-backend)