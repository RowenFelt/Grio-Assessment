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

module.exports = {
	authenticate,
};

