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

/*normally I would want to run this as an https server because 
 * I'm sending authentication tokens, but I decided to use http 
 * because of certificate signing issues on localhost
 */
console.log("listening on port 5000")
app.listen('5000'); 
