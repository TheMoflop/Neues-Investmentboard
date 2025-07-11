import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function logError(context: string, error: unknown) {
  if (error instanceof Error) {
    console.error(`[${context}]`, error.message, error.stack);
  } else {
    console.error(`[${context}]`, error);
  }
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validierung
    if (!email || !password) {
      return res.status(400).json({ error: 'Email und Passwort sind erforderlich.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Ungültiges E-Mail-Format.' });
    }
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen lang sein.' });
    }

    // Prüfe ob User bereits existiert
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User mit dieser E-Mail existiert bereits.' });
    }

    // Passwort hashen
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // User erstellen
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    // Logging
    console.info(`[registerUser] Neuer User registriert: ${user.email}`);

    res.status(201).json({ 
      message: 'User erfolgreich registriert',
      user 
    });

  } catch (error) {
    logError('Registrierung fehlgeschlagen', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validierung
    if (!email || !password) {
      return res.status(400).json({ error: 'Email und Passwort sind erforderlich.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Ungültiges E-Mail-Format.' });
    }

    // User finden
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Ungültige Anmeldedaten.' });
    }

    // Passwort prüfen
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Ungültige Anmeldedaten.' });
    }

    // JWT Token erstellen
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_nur_für_entwicklung';
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Logging
    console.info(`[loginUser] User eingeloggt: ${user.email}`);

    res.status(200).json({
      message: 'Login erfolgreich',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    logError('Login fehlgeschlagen', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
};
