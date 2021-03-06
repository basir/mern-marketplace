1. Create React Bootstrap App
   1. create mern-marketplace folder
   2. npx create-react-app frontend
   3. npm start
   4. npm install react-bootstrap
   5. link bootstrap.css CDN to index.html
   6. create Navbar, LinkContainer, Navbar.Brand
   7. create Navbar.Toggle, Navbar.Collapse,
   8. create Container and sample content
   9. create Container, Row, Col, copyright
   10. Update style.css to se min-height for main
2. List Products
   1. create an array of products in products.js
   2. copy some images (680x830) in images folder in public folder
   3. create Product.js component
   4. show product name from props
   5. Use Product component in App.js by creating map() over products
   6. complete Product component to show the products
3. Create Rating Component
   1. create components/Rating.js
   2. link to fontawesome.css in index.html
   3. create div.rating
   4. define Rating object with render()
   5. if !props.value return empty div
   6. else use fa fa-star, fa-star-half-o and fa-star-o
   7. last span for props.text || ''
   8. style div.rating, span and last span
   9. Edit Product component
   10. Use Rating component
4. Product Details Screen
   1. Install react-router-dom react-router-bootstrap
   2. Use BrowserRouter and Route for Home Screen
   3. Create HomeScreen.js
   4. Add product list code there
   5. Create ProductScreen.js
   6. Add new Route from product details to App.js
   7. Create 3 columns for product image, info and action
5. Create Node.JS Server
   1. run npm init in root folder
   2. npm install express
   3. create server.js
   4. add start command as node backend/server.js
   5. require express
   6. create route for / return backend is ready.
   7. move products.js from frontend to backend
   8. create route for /api/products
   9. return products
   10. run npm start
6. Load Products From Backend
   1. edit HomeScreen.js
   2. define products, loading and error.
   3. create useEffect
   4. define async fetchData and call it
   5. install axios
   6. get data from /api/products
   7. show them in the list
7. Install Babel And Nodemon
   1. npm install -D babel core, cli, node, preset-env
   2. Create .babelrc and set presets to @babel/preset-env
   3. npm install -D nodemon
   4. set start: nodemon --watch backend --exec babel-node backend/server.js
   5. convert require to import in server.js
   6. npm start
8. Install ESlint For Code Linting
   1. npm install -D eslint
   2. install VSCode eslint extension
   3. Set VSCode setting for eslint
   4. Install prettier extension
   5. npm install -D eslint-config-prettier
   6. Add extends: "prettier"
9. Add Redux to Home Screen
   1. npm install redux react-redux
   2. Create store.js
   3. initState= {products:[]}
   4. reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload}
   5. export default createStore(reducer, initState)
   6. Edit HomeScreen.js
   7. shopName = useSelector(state=>state.products)
   8. const dispatch = useDispatch()
   9. useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data})
   10. Add store to index.js
10. Show Loading and Message Box
    1. Create Loading Component
    2. Create Message Box Component
    3. Use them in HomeScreen
11. Add Redux to Product Screen
    1. create product details constants, actions and reducers
    2. add reducer to store.js
    3. use action in ProductScreen.js
    4. add /api/product/:id to backend api
12. Handle Add To Cart Button
    1. Handle Add To Cart in ProductScreen.js
    2. create CartScreen.js
13. Implement Add to Cart Action
    1. create addToCart constants, actions and reducers
    2. add reducer to store.js
    3. use action in CartScreen.js
    4. render cartItems.length
14. Design Cart Screen
    1. create 2 columns for cart items and cart action
    2. cartItems.length === 0 ? cart is empty
    3. show item image, name, qty and price
    4. Proceed to Checkout button
15. Implement Remove From Cart Action
    1. create removeFromCart constants, actions and reducers
    2. add reducer to store.js
    3. use action in CartScreen.js
16. Switch From Babel To Native Node
    1. Update node
    2. Update package.json
    3. Add .js to imports
17. Insert Sample Data in MongoDB
    1. npm install mongoose
    2. connect to mongodb
    3. create config.js
    4. npm install dotenv
    5. export MONGODB_URL
    6. create models/userModel.js
    7. create userSchema and userModel
    8. create models/productModel.js
    9. create productSchema and productModel
    10. create userRoute
    11. Seed sample data
18. Create Sign-in Backend
    1. create API for /api/users/signin
    2. create isAuth middleware
19. Design SignIn Screen
    1. create SigninScreen
    2. render email and password fields
    3. create signin constants, actions and reducers
    4. Update Header based on user login
20. Implement SignIn Action
    1. create signin constants, actions and reducers
    2. add reducer to store.js
    3. use action in SigninScreen.js
21. Create Register Backend and Design UI
    1. create API for /api/users/register
    2. insert new user to database
    3. return user info and token
    4. create RegisterScreen
    5. Add fields
    6. Style fields
    7. Add screen to App.js
22. Implement Register Action
    1. create register constants, actions and reducers
    2. add reducer to store.js
    3. use action in RegisterScreen.js
23. Create Profile Backend and Screen
    1. create profile update api in backend
    2. create isAuth in utils.js and use in update profile
    3. create ProfileScreen.js
    4. add form elements
24. Implement Profile Action
    1. create user details constants, actions and reducers
    2. add reducer to store.js
    3. use action in ProfileScreen.js
    4. create update profile constants, actions and reducers
    5. add reducer to store.js
    6. use action in ProfileScreen.js
25. Design Checkout Wizard Screen
    1. create CheckoutSteps.js
    2. create div elements for step 1 to 4
    3. handle redirect in signin and register
    4. create shipping screen
26. Implement Checkout Wizard Action
    1. saveShippingAddress constant, reducer and actions
    2. copy shipping screen and as payment screen
    3. define getPayment and setPayment
    4. redirect user to PlaceOrder.js
27. Create Place Order API
    1. createOrder api
    2. create orderModel
    3. create orderRouter
    4. create post order route
28. Design PlaceOrder Screen
    1. create CartScreen.js
    2. Add checkout wizard
    3. Add shipping, payment and items preview
    4. Add Place Order button
29. Implement PlaceOrder Action
    1. handle place order button click
    2. create place order constants, action and reducer
30. Create Order Screen
    1. build order api for /api/orders/:id
    2. create OrderScreen.js
    3. dispatch order details action in useEffect
    4. load data with useSelector
    5. show data like place order screen
    6. create order details constant, action and reducer
31. Add PayPal Button
    1. get client id from paypal
    2. set it in .env file
    3. create route form /api/paypal/clientId
    4. create getPaypalClientID in api.js
    5. add paypal checkout script in OrderScreen.js
    6. show paypal button
32. Implement Order Payment
    1. update order after payment
    2. create payOrder in api.js
    3. create route for /:id/pay in orderRouter.js
    4. rerender after pay order
33. Display Orders History
    1. create customer orders api
    2. create api for getMyOrders
    3. show orders in profile screen
    4. style orders
34. List Users
    1. build api for list users
    2. Create UserList Screen
    3. create order details constant, action and reducer
35. Delete Users
    1. build api for delete users
    2. create order details constant, action and reducer
    3. Use action in UserListScreen
36. Edit User API and Screen
    1. build api for details and update users
    2. create edit screen UI
37. Edit User Action
    1. define user details constant, action and reducer
    2. show user info in edit screen
    3. define user update constant, action and reducer
    4. update user info in edit screen
38. List Products
    1. Create ProductList Screen
    2. Add to route
    3. use product list action
39. Delete Products
    1. build api for delete products
    2. create product delete constant, action and reducer
    3. Use action in ProductListScreen
40. Build Product Create and Update API
    1. build api for delete products
    2. build api for delete products
41. Create Product Action
    1. define product create constant, action and reducer
    2. use action in Product List Screen
42. Create Product Edit Screen
    1. create edit screen ui
    2. define product details constant, action and reducer
    3. use action in Product Edit Screen
43. Implement Edit Product Action
    1. define product update constant, action and reducer
    2. use action in Product Edit Screen
44. Upload Product Image
    1. npm install multer
    2. create routes/uploadRoute.js
    3. import express and multer
    4. create disk storage with Date.now().jpg as filename
    5. set upload as multer({ storage })
    6. router.post('/', upload.single('image'))
    7. app.use('/api/uploads',uploadRoute) in server.js
    8. create uploads folder and put empty file.txt there.
    9. ProductEditScreen.js
    10. create file input and set id to image-file
    11. handle image-file change
    12. create form data
    13. call uploadProductImage()
    14. create uploadProductImage in api.js
    15. update server.js
45. Admin Orders
    1. create Admin Order menu in header
    2. create AdminOrder.js
    3. load orders from backend
    4. list them in the screen
    5. show delete and edit button
    6. redirect to order details
    7. if order is payed show deliver button for admin
    8. handle click on deliver button
    9. set state to delivered
46. Implement Seller View
    1. add seller menu
    2. list products for seller
    3. list orders for seller
    4. add Seller to Product List and Details Screen
47. Create Seller Profile, Page and Carousel
    1. Add seller field to profile
    2. show seller field if user is seller
    3. upload seller logo
    4. create seller page
    5. show seller info and product
48. Search Products
    1. create search bar in Header.js
    2. add style
    3. handle submit form
    4. edit parse url to get query string
    5. update product list api for search keyword
49. Review Products
    1. create review form in product screen
    2. Implement product review api
    3. show reviews
50. Publish on heroku
    1. Create git repository
    2. Create heroku account
    3. install Heroku CLI
    4. heroku login
    5. heroku apps:create <yourname>mernmp
    6. Edit package.json for build script
    7. `cd frontend && npm install && npm run build`
    8. Edit package.json for node engines
    9. `"engines": { "node": "12.4.0", "npm": "6.9.0" }`
    10. Create Procfile
    11. `web: node --experimental-modules backend/server.js`
    12. Create mongodb atlas database
    13. create MongoDB Account
    14. open cloud.mongodb.com
    15. add new user and save username and password
    16. set Network Access to accept all requests
    17. Create new database
    18. create connection string based on db name and user and password
    19. Set Cloud MongoDB connection in heroku env variables
    20. Commit and push
51. Review Sellers
    1. create review form in seller screen
    2. Implement seller review api
    3. show reviews
52. Add Pagination To Search Products
    1. update productRouter
    2. add paginate to HomeScreen and ProductList
    3. update reducer and router
    4. update app.js
