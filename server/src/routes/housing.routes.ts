import { Router } from 'express';
import {
  predictHousingPrice,
  getModelInfo,
  checkMLHealth,
  trainModel,
} from '../controllers/housing.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { predictHousingPriceSchema } from '../validations/housing.validation.js';

const router = Router();

// GET /api/housing/model-info - Get model information
router.get('/model-info', getModelInfo);

// GET /api/housing/health - Check ML service health
router.get('/health', checkMLHealth);

// POST /api/housing/predict - Predict housing price (with validation)
router.post('/predict', validate(predictHousingPriceSchema), predictHousingPrice);

// POST /api/housing/train - Train/retrain model (admin operation)
router.post('/train', trainModel);

export default router;



