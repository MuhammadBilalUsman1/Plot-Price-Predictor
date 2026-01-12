import { Router } from 'express';
import exampleRoutes from './example.routes.js';
import housingRoutes from './housing.routes.js';

const router = Router();

// Mount route modules
router.use('/example', exampleRoutes);
router.use('/housing', housingRoutes);

// Root API endpoint
router.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the API',
    version: '1.0.0',
    endpoints: {
      example: '/api/example',
      housing: {
        predict: 'POST /api/housing/predict',
        modelInfo: 'GET /api/housing/model-info',
        health: 'GET /api/housing/health',
        train: 'POST /api/housing/train'
      }
    }
  });
});

export default router;


