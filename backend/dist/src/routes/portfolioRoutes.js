"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolioController_1 = require("../controllers/portfolioController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
// Alle Portfolio-Endpunkte sind geschützt
router.use(authMiddleware_1.default);
router.get('/', portfolioController_1.getPortfolios);
router.get('/:id', portfolioController_1.getPortfolioById);
router.post('/', portfolioController_1.createPortfolio);
router.put('/:id', portfolioController_1.updatePortfolio);
router.delete('/:id', portfolioController_1.deletePortfolio);
exports.default = router;
