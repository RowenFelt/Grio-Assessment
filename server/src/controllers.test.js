const jwt = require('jsonwebtoken');
const { incrementCounter, authenticate } = require('./controllers');

const mockreq = (sessionData = {}) => ({
  body: sessionData
});

const mockres = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

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

describe('check_incrementCounter', () => {
  
  var authToken = jwt.sign({username: "john-doe"}, 'grio-secret-code',{expiresIn: 120});

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
//based on https://github.com/HugoDF/mock-express-request-response/releases/tag/check-auth-tests
