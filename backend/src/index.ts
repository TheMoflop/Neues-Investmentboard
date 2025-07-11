import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import brokerRoutes from './routes/brokerRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import positionRoutes from './routes/positionRoutes';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/brokers', brokerRoutes);
app.use('/api/v1/portfolios', portfolioRoutes);
app.use('/api/v1/positions', positionRoutes);

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
