import app from '../src/index';
import request from 'supertest';

let token: string;
let kontoId: number;
let positionId: number;

beforeAll(async () => {
  // User registrieren und einloggen
  const user = {
    email: 'apitest2@example.com',
    password: 'Test12345!',
    name: 'API Tester2'
  };
  await request(app).post('/api/v1/users/register').send(user);
  const loginRes = await request(app).post('/api/v1/users/login').send({ email: user.email, password: user.password });
  token = loginRes.body.token;

  // Broker anlegen
  const brokerRes = await request(app)
    .post('/api/v1/brokers')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'TestBroker', type: 'Online' });
  const brokerId = brokerRes.body.id;

  // Portfolio/Konto anlegen
  const kontoRes = await request(app)
    .post('/api/v1/portfolios')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'TestKonto', brokerId });
  kontoId = kontoRes.body.id;
});

describe('Positions API', () => {
  it('should create a new position', async () => {
    const position = {
      kontoId,
      assetType: 'Aktie',
      symbol: 'TEST123',
      name: 'Testaktie',
      quantity: 10,
      entryPrice: 100,
      entryDate: new Date().toISOString()
    };
    const res = await request(app)
      .post('/api/v1/positions')
      .set('Authorization', `Bearer ${token}`)
      .send(position);
    expect(res.statusCode).toBe(201);
    expect(res.body.symbol).toBe(position.symbol);
    positionId = res.body.id;
  });

  it('should get all positions for user', async () => {
    const res = await request(app)
      .get('/api/v1/positions')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get position by id', async () => {
    const res = await request(app)
      .get(`/api/v1/positions/${positionId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(positionId);
  });

  it('should update a position', async () => {
    const res = await request(app)
      .put(`/api/v1/positions/${positionId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'UpdatedTestaktie', quantity: 20 });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('UpdatedTestaktie');
    expect(res.body.quantity).toBe(20);
  });

  it('should delete a position', async () => {
    const res = await request(app)
      .delete(`/api/v1/positions/${positionId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});
