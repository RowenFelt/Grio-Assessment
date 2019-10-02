/* controllers.test.js
 * A test suite for authentication and incrementCounter controllers
 */

const jwt = require('jsonwebtoken');
const { incrementCounter, authenticate } = require('./controllers');

const mockreq = (sessionData = {}) => ({
  body: sessionData
});

const mockres = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.mockReturn = 0;
  res.json = ((data) => {
	res.mockReturn = data;
  }); 
  return res;

};

/* I recognize that keeping the token in a test file is not best practices, 
 * but I don't know very much about writing token authentication tests. 
 * In a production environment, I would keep all secrets outside of the repo 
 * and inject them using a deployment tool. 
 */

const authToken = jwt.sign({username: "john-doe"}, 'grio-secret-code',{expiresIn: 120});

describe('check_authentication', () => {

  test('should return status 401 if username is not sent in body', async () => {
    const req = mockreq();
    const res = mockres();
    await authenticate(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('should return status 200 with token if username is sent', async () => {
    const req = mockreq({ username: 'Rowen', password: "Felt" });
    const res = mockres();
    await authenticate(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

});
//based on https://github.com/HugoDF/mock-express-request-response/releases/tag/check-auth-tests

describe('check_incrementCounter', () => {
  
  test('should return status 402 if token is not verified', async () => {
    const req = mockreq({ token: 'token' });
    const res = mockres();
    await incrementCounter(req, res);
    expect(res.status).toHaveBeenCalledWith(402);
  });

  test('should return status 403 if body does not contain token', async () => {
    const req = mockreq();
    const res = mockres();
    await incrementCounter(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('should return status 200 if body contains verifiable token and counter', async () => {
    const req = mockreq({ token: authToken, counter: 0 });
    const res = mockres();
	await incrementCounter(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});


describe('increment-tests', () => {

  test('should return tempCounter of 1 if token is valid and counter is 0', async () => {
    const req = mockreq({ token: authToken, counter: 0 });    
    const res = mockres();
    await incrementCounter(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
	expect(res.mockReturn).toEqual(1);
  });

  test('should return tempCounter of 2 if token is valid and counter is 1', async () => {
    const req = mockreq({ token: authToken, counter: 1 });    
    const res = mockres();
    await incrementCounter(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
	expect(res.mockReturn).toEqual(2);
  });

  test('should return tempCounter of 4 if token is valid and counter is 2', async () => {
    const req = mockreq({ token: authToken, counter: 2 });
    const res = mockres();
	await incrementCounter(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
	expect(res.mockReturn).toEqual(4);
  });

  test('should return tempCounter of 8 if token is valid and counter is 4', async () => {
    const req = mockreq({ token: authToken, counter: 4 });
    const res = mockres();
	await incrementCounter(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
	expect(res.mockReturn).toEqual(8);
  });
});
