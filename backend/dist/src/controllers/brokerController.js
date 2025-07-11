"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBroker = exports.getBrokers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getBrokers = async (req, res) => {
    try {
        const brokers = await prisma.broker.findMany({
            where: { userId: req.user?.userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(brokers);
    }
    catch (error) {
        console.error('[getBrokers]', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};
exports.getBrokers = getBrokers;
const createBroker = async (req, res) => {
    try {
        const { name, type, notes } = req.body;
        if (!name || !type) {
            return res.status(400).json({ error: 'Name und Typ sind erforderlich.' });
        }
        const broker = await prisma.broker.create({
            data: {
                name,
                type,
                notes: notes || null,
                userId: req.user.userId
            }
        });
        res.status(201).json(broker);
    }
    catch (error) {
        console.error('[createBroker]', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};
exports.createBroker = createBroker;
