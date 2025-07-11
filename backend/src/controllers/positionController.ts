import { Response } from 'express';
import prisma from '../utils/prismaClient';

// Position = Wertpapier- oder Asset-Position
export const getPositions = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    // Nur Positionen aus Konten des Users
    const positionen = await prisma.position.findMany({
      where: { konto: { broker: { userId } } },
      include: { konto: true, transaktionen: true }
    });
    res.json(positionen);
  } catch (error) {
    console.error('[getPositions] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Laden der Positionen.' });
  }
};

export const getPositionById = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const position = await prisma.position.findFirst({
      where: { id: Number(id), konto: { broker: { userId } } },
      include: { konto: true, transaktionen: true }
    });
    if (!position) return res.status(404).json({ error: 'Position nicht gefunden.' });
    res.json(position);
  } catch (error) {
    console.error('[getPositionById] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Laden der Position.' });
  }
};

export const createPosition = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { kontoId, assetType, symbol, name, quantity, entryPrice, entryDate, fees, leverage } = req.body;
    // Konto muss zum User gehören
    const konto = await prisma.konto.findFirst({ where: { id: kontoId, broker: { userId } } });
    if (!konto) return res.status(400).json({ error: 'Konto nicht gefunden oder nicht zugeordnet.' });
    const position = await prisma.position.create({
      data: { kontoId, assetType, symbol, name, quantity, entryPrice, entryDate, fees, leverage }
    });
    res.status(201).json(position);
  } catch (error) {
    console.error('[createPosition] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Erstellen der Position.' });
  }
};

export const updatePosition = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { assetType, symbol, name, quantity, entryPrice, currentPrice, entryDate, fees, leverage } = req.body;
    // Position muss zum User gehören
    const position = await prisma.position.findFirst({ where: { id: Number(id), konto: { broker: { userId } } } });
    if (!position) return res.status(404).json({ error: 'Position nicht gefunden.' });
    const updated = await prisma.position.update({
      where: { id: Number(id) },
      data: { assetType, symbol, name, quantity, entryPrice, currentPrice, entryDate, fees, leverage }
    });
    res.json(updated);
  } catch (error) {
    console.error('[updatePosition] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren der Position.' });
  }
};

export const deletePosition = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // Position muss zum User gehören
    const position = await prisma.position.findFirst({ where: { id: Number(id), konto: { broker: { userId } } } });
    if (!position) return res.status(404).json({ error: 'Position nicht gefunden.' });
    await prisma.position.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error('[deletePosition] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Löschen der Position.' });
  }
};
