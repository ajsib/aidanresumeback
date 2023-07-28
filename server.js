const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error: ' + error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
