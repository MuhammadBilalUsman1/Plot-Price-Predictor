/**
 * Custom hook for housing prediction
 */
import { useState, useCallback } from 'react';
import { housingService } from '../services/housing.service';
import { HousingPredictionInput, HousingPredictionResponse } from '../types/housing.types';

interface UseHousingPredictionReturn {
  predict: (input: HousingPredictionInput) => Promise<void>;
  prediction: HousingPredictionResponse | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export const useHousingPrediction = (): UseHousingPredictionReturn => {
  const [prediction, setPrediction] = useState<HousingPredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (input: HousingPredictionInput) => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const result = await housingService.predict(input);
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to make prediction');
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPrediction(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    predict,
    prediction,
    loading,
    error,
    reset,
  };
};

