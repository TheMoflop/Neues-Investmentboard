"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const positionController_1 = require("../controllers/positionController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
// Alle Positions-Endpunkte sind geschützt
router.use(authMiddleware_1.default);
router.get('/', positionController_1.getPositions);
router.get('/:id', positionController_1.getPositionById);
router.post('/', positionController_1.createPosition);
router.put('/:id', positionController_1.updatePosition);
router.delete('/:id', positionController_1.deletePosition);
exports.default = router;
