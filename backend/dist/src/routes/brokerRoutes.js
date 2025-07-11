"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const brokerController_1 = require("../controllers/brokerController");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.default, brokerController_1.getBrokers);
router.post('/', authMiddleware_1.default, brokerController_1.createBroker);
exports.default = router;
