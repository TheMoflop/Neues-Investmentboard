"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePosition = exports.updatePosition = exports.createPosition = exports.getPositionById = exports.getPositions = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
// Position = Wertpapier- oder Asset-Position
const getPositions = async (req, res) => {
    try {
        const userId = req.user.id;
        // Nur Positionen aus Konten des Users
        const positionen = await prismaClient_1.default.position.findMany({
            where: { konto: { broker: { userId } } },
            include: { konto: true, transaktionen: true }
        });
        res.json(positionen);
    }
    catch (error) {
        console.error('[getPositions] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Laden der Positionen.' });
    }
};
exports.getPositions = getPositions;
const getPositionById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const position = await prismaClient_1.default.position.findFirst({
            where: { id: Number(id), konto: { broker: { userId } } },
            include: { konto: true, transaktionen: true }
        });
        if (!position)
            return res.status(404).json({ error: 'Position nicht gefunden.' });
        res.json(position);
    }
    catch (error) {
        console.error('[getPositionById] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Laden der Position.' });
    }
};
exports.getPositionById = getPositionById;
const createPosition = async (req, res) => {
    try {
        const userId = req.user.id;
        const { kontoId, assetType, symbol, name, quantity, entryPrice, entryDate, fees, leverage } = req.body;
        // Konto muss zum User gehören
        const konto = await prismaClient_1.default.konto.findFirst({ where: { id: kontoId, broker: { userId } } });
        if (!konto)
            return res.status(400).json({ error: 'Konto nicht gefunden oder nicht zugeordnet.' });
        const position = await prismaClient_1.default.position.create({
            data: { kontoId, assetType, symbol, name, quantity, entryPrice, entryDate, fees, leverage }
        });
        res.status(201).json(position);
    }
    catch (error) {
        console.error('[createPosition] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Erstellen der Position.' });
    }
};
exports.createPosition = createPosition;
const updatePosition = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { assetType, symbol, name, quantity, entryPrice, currentPrice, entryDate, fees, leverage } = req.body;
        // Position muss zum User gehören
        const position = await prismaClient_1.default.position.findFirst({ where: { id: Number(id), konto: { broker: { userId } } } });
        if (!position)
            return res.status(404).json({ error: 'Position nicht gefunden.' });
        const updated = await prismaClient_1.default.position.update({
            where: { id: Number(id) },
            data: { assetType, symbol, name, quantity, entryPrice, currentPrice, entryDate, fees, leverage }
        });
        res.json(updated);
    }
    catch (error) {
        console.error('[updatePosition] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Aktualisieren der Position.' });
    }
};
exports.updatePosition = updatePosition;
const deletePosition = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        // Position muss zum User gehören
        const position = await prismaClient_1.default.position.findFirst({ where: { id: Number(id), konto: { broker: { userId } } } });
        if (!position)
            return res.status(404).json({ error: 'Position nicht gefunden.' });
        await prismaClient_1.default.position.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        console.error('[deletePosition] Fehler:', error);
        res.status(500).json({ error: 'Fehler beim Löschen der Position.' });
    }
};
exports.deletePosition = deletePosition;
