const request = require('supertest');
const app = require('../');

describe('Users API Tests', () => {
  it('should respond a list of all users data', async () => {
    const response = await request(app).get('/api/v1/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toBeTruthy();
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should respond a user by Id', async () => {
    const userId = 1;
    const response = await request(app).get(`/api/v1/users/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toBeTruthy();
    ['id', 'name', 'email'].forEach((prop) =>
      expect(response.body.data).toHaveProperty(prop)
    );
    expect(response.body.data.profile).toBeDefined();
    ['address', 'identity_type', 'identity_number'].forEach((prop) =>
      expect(response.body.data.profile).toHaveProperty(prop)
    );
  });

  it('should create a new user', async () => {
    const newUser = {
      name: 'John D',
      email: 'john.d@example.com',
      password: 'johnd123',
      address: 'Indonesia',
      identity_type: 'KTP',
      identity_number: '12345678912',
    };

    const response = await request(app).post('/api/v1/users').send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe(201);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toBeTruthy();
    expect(response.body.data).toHaveProperty('id');
  });

  it('should update a user by Id', async () => {
    const userId = 1;
    const updatedData = {
      name: 'John S',
      email: 'john.s@example.com',
      identity_type: 'Paspor',
      identity_account_number: '98765432123',
      address: 'singapore',
    };

    const response = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toBeNull();
  });
});
