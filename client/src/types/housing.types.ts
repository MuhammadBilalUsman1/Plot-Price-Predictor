/**
 * Type definitions for housing prediction feature
 */

export interface HousingPredictionInput {
  longitude: number;
  latitude: number;
  housing_median_age: number;
  total_rooms: number;
  total_bedrooms: number;
  population: number;
  households: number;
  median_income: number;
  ocean_proximity: OceanProximity;
}

export type OceanProximity = 
  | 'NEAR BAY'
  | 'INLAND'
  | 'ISLAND'
  | 'NEAR OCEAN'
  | '<1H OCEAN';

export interface HousingPredictionResponse {
  success: boolean;
  message: string;
  data: {
    predictedPrice: number;
    input: HousingPredictionInput;
    timestamp: string;
  };
}

export interface ModelInfoResponse {
  success: boolean;
  data: {
    modelLoaded: boolean;
    featureColumns: string[];
    validOceanProximity: string[];
  };
}

export interface HealthCheckResponse {
  success: boolean;
  data: {
    mlServiceHealthy: boolean;
    mlServiceUrl: string;
  };
}

export interface ApiError {
  error: string;
  message?: string;
  details?: Record<string, unknown>;
}

