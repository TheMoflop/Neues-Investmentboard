import { Router } from 'express';
import authenticateJWT from '../middlewares/authMiddleware';
import { getBrokers, createBroker } from '../controllers/brokerController';

const router = Router();

router.get('/', authenticateJWT, getBrokers);
router.post('/', authenticateJWT, createBroker);

export default router;
