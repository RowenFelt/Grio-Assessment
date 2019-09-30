const jwt = require('jsonwebtoken');

const mockreq = (sessionData = {}) => ({
  body: sessionData
});

const mockres = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const { authenticate } = require('./controllers');

// describe('login', () => {});
// describe('logout', () => {});
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
