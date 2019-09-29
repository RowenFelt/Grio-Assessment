const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var token = null;

//token authentication route
//adapted from https://www.npmjs.com/package/jsonwebtoken
app.post('/authenticate', function(req, res){
	console.log("received authentication request");
  	var authToken = jwt.sign({username: req.body.data.username}, 'grio-secret-code',{expiresIn: 120});
	token = authToken;
	res.status(200).json(authToken);
})

// Register a route that requires a valid token to view data
app.get('/api', function(req, res){
  const token = req.query.token;
  jwt.verify(token, 'grio-secret-code', function(err, decoded){
    if(!err){
      var secrets = {"accountNumber" : "938291239","pin" : "11289","account" : "Finance"};
      res.json(secrets);
    } else {
      res.send(err);
    }
  })
})

// Launch our app on port 5000
console.log("listening on port 5000")
app.listen('5000');
