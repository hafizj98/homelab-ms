const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Hafiz shopping website.'); // Changed from 'Hello, World!' to 'Incorrect Response'
});

app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

app.get('/ready', (req, res) => {
  res.status(200).send('Ready');
});

app.listen(port, () => {
  console.log(`Microservice listening at port ${port}`);
});

app.get('/hello-ms', (req, res) => {
  res.send('Hello, MS!');
});


module.exports = app;