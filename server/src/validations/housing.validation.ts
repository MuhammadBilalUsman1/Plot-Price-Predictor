import { z } from 'zod';

// Valid ocean proximity values
const VALID_OCEAN_PROXIMITY = [
  'NEAR BAY',
  'INLAND',
  'ISLAND',
  'NEAR OCEAN',
  '<1H OCEAN',
] as const;

export const predictHousingPriceSchema = z.object({
  body: z.object({
    longitude: z
      .number({
        required_error: 'Longitude is required',
        invalid_type_error: 'Longitude must be a number',
      })
      .min(-180, 'Longitude must be between -180 and 180')
      .max(180, 'Longitude must be between -180 and 180'),
    
    latitude: z
      .number({
        required_error: 'Latitude is required',
        invalid_type_error: 'Latitude must be a number',
      })
      .min(-90, 'Latitude must be between -90 and 90')
      .max(90, 'Latitude must be between -90 and 90'),
    
    housing_median_age: z
      .number({
        required_error: 'Housing median age is required',
        invalid_type_error: 'Housing median age must be a number',
      })
      .int('Housing median age must be an integer')
      .min(0, 'Housing median age must be positive')
      .max(200, 'Housing median age seems unrealistic'),
    
    total_rooms: z
      .number({
        required_error: 'Total rooms is required',
        invalid_type_error: 'Total rooms must be a number',
      })
      .int('Total rooms must be an integer')
      .positive('Total rooms must be positive'),
    
    total_bedrooms: z
      .number({
        required_error: 'Total bedrooms is required',
        invalid_type_error: 'Total bedrooms must be a number',
      })
      .int('Total bedrooms must be an integer')
      .min(0, 'Total bedrooms cannot be negative'),
    
    population: z
      .number({
        required_error: 'Population is required',
        invalid_type_error: 'Population must be a number',
      })
      .int('Population must be an integer')
      .min(0, 'Population cannot be negative'),
    
    households: z
      .number({
        required_error: 'Households is required',
        invalid_type_error: 'Households must be a number',
      })
      .int('Households must be an integer')
      .positive('Households must be positive'),
    
    median_income: z
      .number({
        required_error: 'Median income is required',
        invalid_type_error: 'Median income must be a number',
      })
      .positive('Median income must be positive')
      .max(20, 'Median income seems unrealistic'),
    
    ocean_proximity: z
      .enum(VALID_OCEAN_PROXIMITY, {
        required_error: 'Ocean proximity is required',
        invalid_type_error: 'Ocean proximity must be a string',
      })
      .refine(
        (val) => VALID_OCEAN_PROXIMITY.includes(val as any),
        {
          message: `Ocean proximity must be one of: ${VALID_OCEAN_PROXIMITY.join(', ')}`,
        }
      ),
  }),
});

export type PredictHousingPriceInput = z.infer<typeof predictHousingPriceSchema>['body'];

export const VALID_OCEAN_PROXIMITY_VALUES = VALID_OCEAN_PROXIMITY;







