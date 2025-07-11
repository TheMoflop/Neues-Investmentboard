import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import brokerRoutes from './routes/brokerRoutes';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/brokers', brokerRoutes);

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
