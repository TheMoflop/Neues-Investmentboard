import request from 'supertest';
import app from '../src/index';

let token: string;
let brokerId: number;

beforeAll(async () => {
  // User registrieren und einloggen für Tests
  const user = {
    email: `portfoliotest${Date.now()}@example.com`,
    password: 'Test12345!',
    name: 'Portfolio Tester'
  };
  await request(app).post('/api/v1/users/register').send(user);
  const loginRes = await request(app).post('/api/v1/users/login').send({ email: user.email, password: user.password });
  token = loginRes.body.token;

  // Broker anlegen für Portfolio-Tests
  const brokerRes = await request(app)
    .post('/api/v1/brokers')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Portfolio Test Broker', type: 'Online' });
  brokerId = brokerRes.body.id;
});

describe('Portfolio API', () => {
  let portfolioId: number;

  it('should create a new portfolio', async () => {
    const portfolio = {
      name: 'Test Portfolio',
      accountNumber: 'ACC123456',
      currency: 'EUR',
      brokerId
    };
    const res = await request(app)
      .post('/api/v1/portfolios')
      .set('Authorization', `Bearer ${token}`)
      .send(portfolio);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(portfolio.name);
    expect(res.body.currency).toBe(portfolio.currency);
    portfolioId = res.body.id;
  });

  it('should get all portfolios for user', async () => {
    const res = await request(app)
      .get('/api/v1/portfolios')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get portfolio by id', async () => {
    const res = await request(app)
      .get(`/api/v1/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(portfolioId);
  });

  it('should update a portfolio', async () => {
    const res = await request(app)
      .put(`/api/v1/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Test Portfolio', currency: 'USD' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Test Portfolio');
    expect(res.body.currency).toBe('USD');
  });

  it('should fail to create portfolio without authentication', async () => {
    const portfolio = {
      name: 'Unauthorized Portfolio',
      brokerId
    };
    const res = await request(app)
      .post('/api/v1/portfolios')
      .send(portfolio);
    expect(res.statusCode).toBe(401);
  });

  it('should fail to create portfolio with invalid broker', async () => {
    const portfolio = {
      name: 'Invalid Broker Portfolio',
      brokerId: 99999 // nicht existierende Broker-ID
    };
    const res = await request(app)
      .post('/api/v1/portfolios')
      .set('Authorization', `Bearer ${token}`)
      .send(portfolio);
    expect(res.statusCode).toBe(400);
  });

  it('should delete a portfolio', async () => {
    const res = await request(app)
      .delete(`/api/v1/portfolios/${portfolioId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});
