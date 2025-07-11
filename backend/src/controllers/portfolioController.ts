import { Response } from 'express';
import prisma from '../utils/prismaClient';

// Portfolio = Konto
export const getPortfolios = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const konten = await prisma.konto.findMany({
      where: { broker: { userId } },
      include: { broker: true, positionen: true, transaktionen: true }
    });
    res.json(konten);
  } catch (error) {
    console.error('[getPortfolios] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Laden der Portfolios.' });
  }
};

export const getPortfolioById = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const konto = await prisma.konto.findFirst({
      where: { id: Number(id), broker: { userId } },
      include: { broker: true, positionen: true, transaktionen: true }
    });
    if (!konto) return res.status(404).json({ error: 'Portfolio nicht gefunden.' });
    res.json(konto);
  } catch (error) {
    console.error('[getPortfolioById] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Laden des Portfolios.' });
  }
};

export const createPortfolio = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { name, accountNumber, currency, brokerId } = req.body;
    // Broker muss zum User gehören
    const broker = await prisma.broker.findFirst({ where: { id: brokerId, userId } });
    if (!broker) return res.status(400).json({ error: 'Broker nicht gefunden oder nicht zugeordnet.' });
    const konto = await prisma.konto.create({
      data: { name, accountNumber, currency, brokerId }
    });
    res.status(201).json(konto);
  } catch (error) {
    console.error('[createPortfolio] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Erstellen des Portfolios.' });
  }
};

export const updatePortfolio = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, accountNumber, currency } = req.body;
    // Konto muss zum User gehören
    const konto = await prisma.konto.findFirst({ where: { id: Number(id), broker: { userId } } });
    if (!konto) return res.status(404).json({ error: 'Portfolio nicht gefunden.' });
    const updated = await prisma.konto.update({
      where: { id: Number(id) },
      data: { name, accountNumber, currency }
    });
    res.json(updated);
  } catch (error) {
    console.error('[updatePortfolio] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Portfolios.' });
  }
};

export const deletePortfolio = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // Konto muss zum User gehören
    const konto = await prisma.konto.findFirst({ where: { id: Number(id), broker: { userId } } });
    if (!konto) return res.status(404).json({ error: 'Portfolio nicht gefunden.' });
    await prisma.konto.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error('[deletePortfolio] Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Löschen des Portfolios.' });
  }
};
