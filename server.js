//create express app
const exp = require("express");
const app = exp();
require('dotenv').config()
//assign port numnrt
const port=process.env.PORT || 4000;
app.listen(4000, () => console.log("server listening on port 4000..."));



const path=require("path")
//connect express with react build
app.use(exp.static(path.join(__dirname,'./build')))

//Get mongo client
const mclient=require("mongodb").MongoClient;

async function connectToDatabase() {
  try {
    // Connect to MongoDB
    const client = await mclient.connect(process.env.DATABASE_URL);
    const db = client.db("demodb");

    // Create collections if they don't exist
    const collections = ['usersCollection', 'productsCollections'];
    
    for (const collectionName of collections) {
      const exists = await db.listCollections({ name: collectionName }).hasNext();
      if (!exists) {
        await db.createCollection(collectionName);
        console.log(`${collectionName} collection created`);
      }
    }

    // Set collections to app
    app.set('usersCollection', db.collection('users'));
    app.set('productsCollection', db.collection('products'));

    console.log('Connected to database successfully');
    
  } catch (error) {
    console.log('Database connection error:', error);
  }
}

// Call the function
connectToDatabase();

//import userApp and productApp
const userApp = require("./APIs/userApi");
const productApp = require("./APIs/productApi");

//forward request to userApi when url path starts with /user-api
app.use("/user-api", userApp);
//forward request to productApi when url path starts with /product-api
app.use("/product-api", productApp);


//middleware to deal with page refresh
const pageRefresh=(request,response,next)=>{
  response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("*",pageRefresh)




//create a middleware to handle invalid path
const invalidPathHandlingMiddleware = (request, response, next) => {
  response.send({ message: "Invalid path" });
};

app.use(invalidPathHandlingMiddleware);

//create err handling middleware
const errHandler = (error, request, response, next) => {
  response.send({ "error-message": error.message });
};
app.use(errHandler);
