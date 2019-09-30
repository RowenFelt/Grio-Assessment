const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const { authenticate, incrementCounter } = require('./src/controllers.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//adapted from https://www.npmjs.com/package/jsonwebtoken
app.post('/authenticate', authenticate);
app.post('/incrementCounter', incrementCounter);

// Launch our app on port 5000
console.log("listening on port 5000")
app.listen('5000');
