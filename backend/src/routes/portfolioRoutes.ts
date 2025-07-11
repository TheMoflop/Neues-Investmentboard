import { Router } from 'express';
import {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio
} from '../controllers/portfolioController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// Alle Portfolio-Endpunkte sind geschützt
router.use(authMiddleware);

router.get('/', getPortfolios);
router.get('/:id', getPortfolioById);
router.post('/', createPortfolio);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

export default router;
