const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (error) {
    console.log('MongoDB connection error: ' + error);
  }
}
run().catch(console.dir);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes(client)); // Pass the MongoDB client to the routes

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
