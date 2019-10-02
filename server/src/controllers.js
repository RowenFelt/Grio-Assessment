/* controllers.js
 * route controllers for Grio-Assessment server
 */

const jwt = require('jsonwebtoken');
const { checkSchema } = require('express-validator');

/* authenticate route
 * arguments:
 *	  req: request object
 *	  res: response object
 * requires that request body contain any username and password string
 * returns a jsonwebtoken for verification or status 401 if no credentials are contained in req body
 */
async function authenticate(req, res){
  console.log("received authentication request");
  if (!("username" in req.body)){
	res.status(401).json();
  } else {
	var authToken = jwt.sign({username: req.body.username}, 'grio-secret-code',{expiresIn: 120});
	res.status(200).json(authToken);
  }
}

/* incrementCounter route
 * arguments:
 *	  req: request object
 *	  res: response object
 * requires token and counter be contained in req body
 * returns updated tempCounter on success, or error code 402 if token cannot be verified
 * or error code 403 if token is not contained in req body
 */
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
		res.status(402);
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

