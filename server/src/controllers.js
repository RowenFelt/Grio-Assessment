const jwt = require('jsonwebtoken');
const { checkSchema } = require('express-validator');

async function authenticate(req, res){
  console.log("received authentication request");
  if (!("username" in req.body)){
	res.status(401).json();
  } else {
	var authToken = jwt.sign({username: req.body.username}, 'grio-secret-code',{expiresIn: 120});
	res.status(200).json(authToken);
  }
}

async function incrementCounter(req, res){
  console.log("received increment request");
  if ("token" in req.body){
	const token = req.body.token;
	jwt.verify(token, 'grio-secret-code', function(err, decoded){
	  if(!err){ 
		if ("counter" in req.body){
		  const counter = req.body.counter;
		  const tempCounter = Math.max(1, counter*2);
		  res.status(200).json(tempCounter);
		}
	  } else {
		res.status(402).send(err);
	  }
	})
  } else {
	res.status(403);
  }
}

module.exports = {
  authenticate,
  incrementCounter,
};

