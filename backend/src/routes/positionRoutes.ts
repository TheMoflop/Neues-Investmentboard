import { Router } from 'express';
import {
  getPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition
} from '../controllers/positionController';
import authenticateJWT from '../middlewares/authMiddleware';

const router = Router();

// Alle Positions-Endpunkte sind geschützt
router.use(authenticateJWT);

router.get('/', getPositions);
router.get('/:id', getPositionById);
router.post('/', createPosition);
router.put('/:id', updatePosition);
router.delete('/:id', deletePosition);

export default router;
