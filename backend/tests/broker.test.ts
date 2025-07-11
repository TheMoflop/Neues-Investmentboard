import request from 'supertest';
import app from '../src/index';

let token: string;

beforeAll(async () => {
  // User registrieren und einloggen für Tests
  const user = {
    email: `brokertest${Date.now()}@example.com`,
    password: 'Test12345!',
    name: 'Broker Tester'
  };
  await request(app).post('/api/v1/users/register').send(user);
  const loginRes = await request(app).post('/api/v1/users/login').send({ email: user.email, password: user.password });
  token = loginRes.body.token;
});

describe('Broker API', () => {
  it('should create a new broker', async () => {
    const broker = {
      name: 'Test Broker GmbH',
      type: 'Online',
      notes: 'Testbroker für automatisierte Tests'
    };
    const res = await request(app)
      .post('/api/v1/brokers')
      .set('Authorization', `Bearer ${token}`)
      .send(broker);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(broker.name);
    expect(res.body.type).toBe(broker.type);
  });

  it('should get all brokers for user', async () => {
    const res = await request(app)
      .get('/api/v1/brokers')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fail to create broker without authentication', async () => {
    const broker = {
      name: 'Unauthorized Broker',
      type: 'Bank'
    };
    const res = await request(app)
      .post('/api/v1/brokers')
      .send(broker);
    expect(res.statusCode).toBe(401);
  });

  it('should fail to create broker with invalid data', async () => {
    const broker = {
      // name fehlt
      type: 'Online'
    };
    const res = await request(app)
      .post('/api/v1/brokers')
      .set('Authorization', `Bearer ${token}`)
      .send(broker);
    expect(res.statusCode).toBe(400);
  });

  it('should fail to access brokers without authentication', async () => {
    const res = await request(app)
      .get('/api/v1/brokers');
    expect(res.statusCode).toBe(401);
  });
});
