/**
 * Base API service with axios configuration
 */
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { ApiErrorResponse } from '../types/api.types';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any auth tokens here if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        // Handle common errors
        if (error.response) {
          // Server responded with error status
          const message = error.response.data?.error || error.response.data?.message || 'An error occurred';
          return Promise.reject(new Error(message));
        } else if (error.request) {
          // Request was made but no response received
          return Promise.reject(new Error('Network error. Please check your connection.'));
        } else {
          // Error setting up request
          return Promise.reject(new Error(error.message || 'An unexpected error occurred'));
        }
      }
    );
  }

  get clientInstance(): AxiosInstance {
    return this.client;
  }
}

export const apiService = new ApiService();
export const apiClient = apiService.clientInstance;

