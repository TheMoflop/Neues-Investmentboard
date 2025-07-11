"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const brokerRoutes_1 = __importDefault(require("./routes/brokerRoutes"));
const portfolioRoutes_1 = __importDefault(require("./routes/portfolioRoutes"));
const positionRoutes_1 = __importDefault(require("./routes/positionRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/brokers', brokerRoutes_1.default);
app.use('/api/v1/portfolios', portfolioRoutes_1.default);
app.use('/api/v1/positions', positionRoutes_1.default);
if (require.main === module) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
exports.default = app;
