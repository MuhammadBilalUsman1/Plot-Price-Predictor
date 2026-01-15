import axios, { AxiosInstance, AxiosError } from 'axios';
import { AppError } from '../middleware/error.middleware.js';

interface PredictionRequest {
  longitude: number;
  latitude: number;
  housing_median_age: number;
  total_rooms: number;
  total_bedrooms: number;
  population: number;
  households: number;
  median_income: number;
  ocean_proximity: string;
}

interface PredictionResponse {
  success: boolean;
  prediction: number;
  input: PredictionRequest;
}

interface ModelInfoResponse {
  loaded: boolean;
  feature_columns: string[];
  valid_ocean_proximity: string[];
}

interface TrainResponse {
  success: boolean;
  message: string;
  metrics: {
    mae: number;
    train_samples: number;
    test_samples: number;
  };
}

export class MLService {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.ML_SERVICE_URL || 'http://localhost:5000';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30 seconds timeout for ML predictions
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Check if ML service is healthy and model is loaded
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await this.client.get('/api/v1/health');
      return response.data.status === 'ok' && response.data.model_loaded === true;
    } catch (error) {
      console.error('ML Service health check failed:', error);
      return false;
    }
  }

  /**
   * Get model information
   */
  async getModelInfo(): Promise<ModelInfoResponse> {
    try {
      const response = await this.client.get<ModelInfoResponse>('/api/v1/model-info');
      return response.data;
    } catch (error) {
      this.handleError(error, 'Failed to get model info');
      throw error;
    }
  }

  /**
   * Make a housing price prediction
   */
  async predict(data: PredictionRequest): Promise<PredictionResponse> {
    try {
      const response = await this.client.post<PredictionResponse>(
        '/api/v1/predict',
        data
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'Prediction failed');
      throw error;
    }
  }

  /**
   * Train or retrain the model
   */
  async trainModel(): Promise<TrainResponse> {
    try {
      const response = await this.client.post<TrainResponse>('/api/v1/train');
      return response.data;
    } catch (error) {
      this.handleError(error, 'Model training failed');
      throw error;
    }
  }

  /**
   * Handle API errors and convert to AppError
   */
  private handleError(error: unknown, defaultMessage: string): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error: string; message?: string }>;
      
      if (axiosError.response) {
        // Server responded with error status
        const status = axiosError.response.status;
        const message = axiosError.response.data?.error || axiosError.response.data?.message || defaultMessage;
        
        throw new AppError(message, status);
      } else if (axiosError.request) {
        // Request was made but no response received
        throw new AppError('ML service is unavailable. Please ensure the service is running.', 503);
      } else {
        // Error setting up request
        throw new AppError(`ML service error: ${axiosError.message}`, 500);
      }
    } else {
      throw new AppError(defaultMessage, 500);
    }
  }
}

// Export singleton instance
export const mlService = new MLService();







