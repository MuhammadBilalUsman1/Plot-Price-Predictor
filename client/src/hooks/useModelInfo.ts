/**
 * Custom hook for fetching model information
 */
import { useState, useEffect, useCallback } from 'react';
import { housingService } from '../services/housing.service';
import { ModelInfoResponse } from '../types/housing.types';

interface UseModelInfoReturn {
  modelInfo: ModelInfoResponse['data'] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useModelInfo = (): UseModelInfoReturn => {
  const [modelInfo, setModelInfo] = useState<ModelInfoResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModelInfo = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await housingService.getModelInfo();
      setModelInfo(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch model information');
      setModelInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModelInfo();
  }, [fetchModelInfo]);

  return {
    modelInfo,
    loading,
    error,
    refetch: fetchModelInfo,
  };
};

