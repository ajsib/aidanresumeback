const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, this is your backend server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
