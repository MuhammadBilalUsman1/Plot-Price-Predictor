import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/async.middleware.js';
import { mlService } from '../services/ml.service.js';
import { PredictHousingPriceInput } from '../validations/housing.validation.js';

/**
 * Predict housing price based on input features
 */
export const predictHousingPrice = asyncHandler(
  async (req: Request<{}, {}, PredictHousingPriceInput>, res: Response) => {
    const predictionData = req.body;

    // Make prediction through ML service
    const result = await mlService.predict(predictionData);

    res.json({
      success: true,
      message: 'Prediction completed successfully',
      data: {
        predictedPrice: result.prediction,
        input: result.input,
        timestamp: new Date().toISOString(),
      },
    });
  }
);

/**
 * Get model information
 */
export const getModelInfo = asyncHandler(async (req: Request, res: Response) => {
  const modelInfo = await mlService.getModelInfo();

  res.json({
    success: true,
    data: {
      modelLoaded: modelInfo.loaded,
      featureColumns: modelInfo.feature_columns,
      validOceanProximity: modelInfo.valid_ocean_proximity,
    },
  });
});

/**
 * Check ML service health
 */
export const checkMLHealth = asyncHandler(async (req: Request, res: Response) => {
  const isHealthy = await mlService.checkHealth();

  res.json({
    success: true,
    data: {
      mlServiceHealthy: isHealthy,
      mlServiceUrl: process.env.ML_SERVICE_URL || 'http://localhost:5000',
    },
  });
});

/**
 * Train or retrain the model
 * Note: This is an admin operation and should be protected in production
 */
export const trainModel = asyncHandler(async (req: Request, res: Response) => {
  const result = await mlService.trainModel();

  res.json({
    success: true,
    message: result.message,
    data: {
      metrics: result.metrics,
      timestamp: new Date().toISOString(),
    },
  });
});



