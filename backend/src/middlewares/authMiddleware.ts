import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { userId: number; email: string };
}

const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token fehlt oder ist ungültig.' });
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_nur_für_entwicklung';

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: number; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    console.error('[authenticateJWT] Fehler beim Token-Check:', error);
    return res.status(401).json({ error: 'Token ungültig oder abgelaufen.' });
  }
};

export default authenticateJWT;
