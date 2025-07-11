/// <reference types="jest" />
import app from '../src/index';
import request from 'supertest';

describe('User API', () => {
  const testUser = {
    email: 'apitest@example.com',
    password: 'Test12345!',
    name: 'API Tester'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users/register')
      .send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(testUser.email);
  });

  it('should login the user and return a token', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
