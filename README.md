### Mern Stack Ecommerce Website ###

E-Commerce Application

Features:
    [Core] User Login and Registration ✅
    [Core] Catalogue Page with [Stretch]User Reviews
    [Core] Product Page/Component With Product Info ✅
    [Core] Cart For User Products ✅
    [Stretch] Admin product management ✅
    [Stretch] User management page ✅
    [Super Stretch] Stripe or Paypal Integration ✅

# Guide: 

# 1 - Create an account 
# 2 - Buy Something ( use this values to pay: sb-wa9hr20298853@personal.example.com || 9l@y3,&P )
# 3 - Navigate to user profile page
# 4 - Logout
# 5 - Login as admin ( admin@example.com || 123456 )
# 6 - Navigate to dashboard
# 7 - Delete a user, create, delete and edit a product

Packages: 

<!-- Frontend -->
- React Router Dom
- Axios 
- Redux
- Node-Sass
- React Icons
- react-loader-spinner
- react-paypal-button-v2
<!-- Backend -->
- ES Modules in Node.js
- Morgan
- bcryptjs
- jsonwebtoken
- mongoose
- multer

<!-- Steps -->
- Create Controller
- Create Backend Route
- Create Constant
- Create Reducer
- Add to store
- Create Action
- Create the screen

Documentation: 
- https://github.com/GoncaloSantosdev/clothing-ecommerce-website/tree/main/frontend
- https://github.com/GoncaloSantosdev/clothing-ecommerce-website/tree/main/backend

Deployment:

- https://clothingecommerceapp.herokuapp.com/

Author: 

- Gonçalo Diegues dos Santos

### How I create the app ###
1 - Create Frontend Folder ( npx install create-react-app )
2 - Install Frontend Dependencies ( React Router, Sass, React Icons )
3 - Create Frontend Folder Structure
4 - Create reset styles
5 - Create Home Route and implement react router 
6 - Create Navbar
7 - List Products 
8 - List Single Product 
9 - Create Backend Folder 
10 - Get All Products
11 - Get Single Product
12 - Install Axios
13 - Fetch products from react
14 - Add ( "proxy": "http://127.0.0.1:4000", ) to Frontend pakcage.json
15 - Fetch Single Product from react
15 - Fetch Single Product from react
16 - Install nodemon and concurrently
16 - Install nodemon and concurrently
17 - Config package.json with concurrently to run frontend and backend at the same time
17 - Config package.json with concurrently to run frontend and backend at the same time
18 - Add Env Files
18 - Add Env Files
19 - Setup MongoDB atlas & Compass
19 - Setup MongoDB atlas & Compass
20 - Connect app to database with mongoose
20 - Connect app to database with mongoose
21 - Create mongoose schemas for orders, products and users
21 - Create mongoose schemas for orders, products and users
22 - Prepare Data & Implement bycript
22 - Prepare Data & Implement bycript
23 - Add Data to the database
24 - Fetch products from the database
25 - Implement Redux - Create a Redux Store ( redux react-redux redux-thunk redux-devtools-extension )
26 - Fetch all products with redux ( create product actions & product reducers )
27 - Implement Loader Spinner (npm i react-loader-spinner)
28 - Add quantity to product details
29 - Create Add to Cart Route
30 - Create Cart action & reducer
31 - Save items to localstorage & add & remove to cart functionality
32 - Create user authentication endpoint
33 - Install JWT (npm install jsonwebtoken)
34 - Generate a token
35 - Create user reducer & action
36 - Create login page
37 - Change navbar after login
38 - Logout button
39 - Style Sign In Page
40 - Register action and reducer
41 - Create Profile Page 
42 - Update user info 
43 - Shipping Page
44 - Order Info Page
45 - Add Orders to the database
46 - Order pay reducer & action
47 - Implement Paypal
48 - Create sandbox and business account
49 - Install Paypal Button (npm i react-paypal-button-v2 --force)
50 - Create Admin Dashboard
51 - List Users
52 - Delete User
53 - List Products
54 - Remove product
55 - Create Edit Route
56 - Install Multer to upload files to server ( npm i multer )
57 - Get All Orders
58 - Install Morgan