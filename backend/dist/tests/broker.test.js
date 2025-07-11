"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
let token;
beforeAll(async () => {
    // User registrieren und einloggen für Tests
    const user = {
        email: `brokertest${Date.now()}@example.com`,
        password: 'Test12345!',
        name: 'Broker Tester'
    };
    await (0, supertest_1.default)(index_1.default).post('/api/v1/users/register').send(user);
    const loginRes = await (0, supertest_1.default)(index_1.default).post('/api/v1/users/login').send({ email: user.email, password: user.password });
    token = loginRes.body.token;
});
describe('Broker API', () => {
    it('should create a new broker', async () => {
        const broker = {
            name: 'Test Broker GmbH',
            type: 'Online',
            notes: 'Testbroker für automatisierte Tests'
        };
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/v1/brokers')
            .set('Authorization', `Bearer ${token}`)
            .send(broker);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(broker.name);
        expect(res.body.type).toBe(broker.type);
    });
    it('should get all brokers for user', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/v1/brokers')
            .send(broker);
        expect(res.statusCode).toBe(401);
    });
    it('should fail to create broker with invalid data', async () => {
        const broker = {
            // name fehlt
            type: 'Online'
        };
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/v1/brokers')
            .set('Authorization', `Bearer ${token}`)
            .send(broker);
        expect(res.statusCode).toBe(400);
    });
    it('should fail to access brokers without authentication', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/api/v1/brokers');
        expect(res.statusCode).toBe(401);
    });
});
