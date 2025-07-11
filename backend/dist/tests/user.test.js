"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="jest" />
const index_1 = __importDefault(require("../src/index"));
const supertest_1 = __importDefault(require("supertest"));
describe('User API', () => {
    const testUser = {
        email: `apitest${Date.now()}@example.com`,
        password: 'Test12345!',
        name: 'API Tester'
    };
    it('should register a new user', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/v1/users/register')
            .send(testUser);
        expect(res.statusCode).toBe(201);
        expect(res.body.user.email).toBe(testUser.email);
    });
    it('should login the user and return a token', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/v1/users/login')
            .send({ email: testUser.email, password: testUser.password });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
