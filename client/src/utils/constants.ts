/**
 * Application constants
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const VALID_OCEAN_PROXIMITY: Array<'NEAR BAY' | 'INLAND' | 'ISLAND' | 'NEAR OCEAN' | '<1H OCEAN'> = [
  'NEAR BAY',
  'INLAND',
  'ISLAND',
  'NEAR OCEAN',
  '<1H OCEAN',
];

export const OCEAN_PROXIMITY_OPTIONS = [
  { value: 'NEAR BAY', label: 'Near Bay' },
  { value: 'INLAND', label: 'Inland' },
  { value: 'ISLAND', label: 'Island' },
  { value: 'NEAR OCEAN', label: 'Near Ocean' },
  { value: '<1H OCEAN', label: '<1H Ocean' },
] as const;

export const FORM_FIELD_LABELS = {
  longitude: 'Longitude',
  latitude: 'Latitude',
  housing_median_age: 'Housing Median Age',
  total_rooms: 'Total Rooms',
  total_bedrooms: 'Total Bedrooms',
  population: 'Population',
  households: 'Households',
  median_income: 'Median Income',
  ocean_proximity: 'Ocean Proximity',
} as const;

export const FORM_FIELD_PLACEHOLDERS = {
  longitude: 'e.g., -122.26',
  latitude: 'e.g., 37.84',
  housing_median_age: 'e.g., 50',
  total_rooms: 'e.g., 2239',
  total_bedrooms: 'e.g., 455',
  population: 'e.g., 990',
  households: 'e.g., 419',
  median_income: 'e.g., 1.9911',
  ocean_proximity: 'Select ocean proximity',
} as const;

