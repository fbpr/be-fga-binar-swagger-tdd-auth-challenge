const request = require('supertest');
const app = require('../');

describe('Accounts API Tests', () => {
  it('should respond a list of all accounts data', async () => {
    const response = await request(app).get('/api/v1/accounts');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toBeTruthy();
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should respond an account by Id', async () => {
    const accountId = 1;
    const response = await request(app).get(`/api/v1/accounts/${accountId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data).toBeTruthy();
    ['id', 'bank_name', 'bank_account_number', 'balance'].forEach((prop) =>
      expect(response.body.data).toHaveProperty(prop)
    );
    expect(response.body.data.user).toBeDefined();
    ['name', 'email'].forEach((prop) =>
      expect(response.body.data.user).toHaveProperty(prop)
    );
  });

  it('should create a new account', async () => {
    const newAccount = {
      user_id: 1,
      bank_name: 'Example Bank',
      bank_account_number: '123456789123',
      balance: 1000000,
    };

    const response = await request(app)
      .post('/api/v1/accounts')
      .send(newAccount);

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe(201);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toBeTruthy();
    expect(response.body.data).toHaveProperty('id');
  });
});
