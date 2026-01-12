/**
 * Housing prediction API service
 */
import { apiClient } from './api.service';
import {
  HousingPredictionInput,
  HousingPredictionResponse,
  ModelInfoResponse,
  HealthCheckResponse,
} from '../types/housing.types';

export const housingService = {
  /**
   * Predict housing price based on input features
   */
  async predict(input: HousingPredictionInput): Promise<HousingPredictionResponse> {
    const response = await apiClient.post<HousingPredictionResponse>(
      '/housing/predict',
      input
    );
    return response.data;
  },

  /**
   * Get model information
   */
  async getModelInfo(): Promise<ModelInfoResponse> {
    const response = await apiClient.get<ModelInfoResponse>('/housing/model-info');
    return response.data;
  },

  /**
   * Check ML service health
   */
  async checkHealth(): Promise<HealthCheckResponse> {
    const response = await apiClient.get<HealthCheckResponse>('/housing/health');
    return response.data;
  },
};

