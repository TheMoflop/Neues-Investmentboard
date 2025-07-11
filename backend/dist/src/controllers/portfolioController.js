"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePortfolio = exports.updatePortfolio = exports.createPortfolio = exports.getPortfolioById = exports.getPortfolios = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
// Portfolio = Konto
const getPortfolios = async (req, res) => {
    try {
        const userId = req.user.id;
        const konten = await prismaClient_1.default.konto.findMany({
            where: { broker: { userId } },
            include: { broker: true, positionen: true, transaktionen: true }
        });
        res.json(konten);
    }
    catch (error) {
        console.error('[getPortfolios] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Laden der Portfolios.' });
    }
};
exports.getPortfolios = getPortfolios;
const getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const konto = await prismaClient_1.default.konto.findFirst({
            where: { id: Number(id), broker: { userId } },
            include: { broker: true, positionen: true, transaktionen: true }
        });
        if (!konto)
            return res.status(404).json({ error: 'Portfolio nicht gefunden.' });
        res.json(konto);
    }
    catch (error) {
        console.error('[getPortfolioById] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Laden des Portfolios.' });
    }
};
exports.getPortfolioById = getPortfolioById;
const createPortfolio = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, accountNumber, currency, brokerId } = req.body;
        // Broker muss zum User gehören
        const broker = await prismaClient_1.default.broker.findFirst({ where: { id: brokerId, userId } });
        if (!broker)
            return res.status(400).json({ error: 'Broker nicht gefunden oder nicht zugeordnet.' });
        const konto = await prismaClient_1.default.konto.create({
            data: { name, accountNumber, currency, brokerId }
        });
        res.status(201).json(konto);
    }
    catch (error) {
        console.error('[createPortfolio] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Erstellen des Portfolios.' });
    }
};
exports.createPortfolio = createPortfolio;
const updatePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { name, accountNumber, currency } = req.body;
        // Konto muss zum User gehören
        const konto = await prismaClient_1.default.konto.findFirst({ where: { id: Number(id), broker: { userId } } });
        if (!konto)
            return res.status(404).json({ error: 'Portfolio nicht gefunden.' });
        const updated = await prismaClient_1.default.konto.update({
            where: { id: Number(id) },
            data: { name, accountNumber, currency }
        });
        res.json(updated);
    }
    catch (error) {
        console.error('[updatePortfolio] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Aktualisieren des Portfolios.' });
    }
};
exports.updatePortfolio = updatePortfolio;
const deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        // Konto muss zum User gehören
        const konto = await prismaClient_1.default.konto.findFirst({ where: { id: Number(id), broker: { userId } } });
        if (!konto)
            return res.status(404).json({ error: 'Portfolio nicht gefunden.' });
        await prismaClient_1.default.konto.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        console.error('[deletePortfolio] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Löschen des Portfolios.' });
    }
};
exports.deletePortfolio = deletePortfolio;
