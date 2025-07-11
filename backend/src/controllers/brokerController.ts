import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware';

const prisma = new PrismaClient();

export const getBrokers = async (req: AuthRequest, res: Response) => {
  try {
    const brokers = await prisma.broker.findMany({
      where: { userId: req.user?.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(brokers);
  } catch (error) {
    console.error('[getBrokers]', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
};

export const createBroker = async (req: AuthRequest, res: Response) => {
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
        userId: req.user!.userId
      }
    });
    res.status(201).json(broker);
  } catch (error) {
    console.error('[createBroker]', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
};
