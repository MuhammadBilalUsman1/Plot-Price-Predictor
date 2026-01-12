/**
 * Housing Prediction Form Component
 */
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '../Card/Card';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { Button } from '../Button/Button';
import { Alert } from '../Alert/Alert';
import { useHousingPrediction } from '../../hooks/useHousingPrediction';
import { housingPredictionSchema } from '../../utils/validation';
import type { HousingPredictionFormData } from '../../utils/validation';
import { OCEAN_PROXIMITY_OPTIONS, FORM_FIELD_LABELS, FORM_FIELD_PLACEHOLDERS } from '../../utils/constants';
import './HousingPredictionForm.css';

export const HousingPredictionForm: React.FC = () => {
  const { predict, prediction, loading, error, reset } = useHousingPrediction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<HousingPredictionFormData>({
    resolver: zodResolver(housingPredictionSchema),
    defaultValues: {
      longitude: undefined,
      latitude: undefined,
      housing_median_age: undefined,
      total_rooms: undefined,
      total_bedrooms: undefined,
      population: undefined,
      households: undefined,
      median_income: undefined,
      ocean_proximity: undefined,
    },
  });

  const onSubmit = async (data: HousingPredictionFormData) => {
    await predict(data);
  };

  const handleReset = () => {
    resetForm();
    reset();
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="housing-prediction-form">
      <Card title="House Price Prediction" variant="elevated">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {error && (
            <Alert variant="error" title="Prediction Error" onClose={reset}>
              {error}
            </Alert>
          )}

          <div className="form-grid">
            <Input
              {...register('longitude', { valueAsNumber: true })}
              label={FORM_FIELD_LABELS.longitude}
              placeholder={FORM_FIELD_PLACEHOLDERS.longitude}
              type="number"
              step="any"
              error={errors.longitude?.message}
              required
            />

            <Input
              {...register('latitude', { valueAsNumber: true })}
              label={FORM_FIELD_LABELS.latitude}
              placeholder={FORM_FIELD_PLACEHOLDERS.latitude}
              type="number"
              step="any"
              error={errors.latitude?.message}
              required
            />

            <Input
              {...register('housing_median_age', { valueAsNumber: true })}
              label={FORM_FIELD_LABELS.housing_median_age}
              placeholder={FORM_FIELD_PLACEHOLDERS.housing_median_age}
              type="number"
              error={errors.housing_median_age?.message}
              required
            />

            <Input
              {...register('total_rooms', { valueAsNumber: true })}
              label={FORM_FIELD_LABELS.total_rooms}
              placeholder={FORM_FIELD_PLACEHOLDERS.total_rooms}
              type="number"
              error={errors.total_rooms?.message}
              required
            />

            <Input
              {...register('total_bedrooms', { valueAsNumber: true })}
              label={FORM_FIELD_LABELS.total_bedrooms}
              placeholder={FORM_FIELD_PLACEHOLDERS.total_bedrooms}
              type="number"
              error={errors.total_bedrooms?.message}
              required
            />

            <Input
              {...register('population', { valueAsNumber: true })}
              label={FORM_FIELD_LABELS.population}
              placeholder={FORM_FIELD_PLACEHOLDERS.population}
              type="number"
              error={errors.population?.message}
              required
            />

            <Input
              {...register('households', { valueAsNumber: true })}
              label={FORM_FIELD_LABELS.households}
              placeholder={FORM_FIELD_PLACEHOLDERS.households}
              type="number"
              error={errors.households?.message}
              required
            />

            <Input
              {...register('median_income', { valueAsNumber: true })}
              label={FORM_FIELD_LABELS.median_income}
              placeholder={FORM_FIELD_PLACEHOLDERS.median_income}
              type="number"
              step="0.0001"
              error={errors.median_income?.message}
              helperText="Median income in tens of thousands"
              required
            />

            <Select
              {...register('ocean_proximity')}
              label={FORM_FIELD_LABELS.ocean_proximity}
              options={[...OCEAN_PROXIMITY_OPTIONS]}
              error={errors.ocean_proximity?.message}
              required
            />
          </div>

          <div className="form-actions">
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Predict Price
            </Button>
            {(prediction || error) && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={loading}
              >
                Reset Form
              </Button>
            )}
          </div>
        </form>

        {prediction && (
          <div className="prediction-result">
            <Alert variant="success" title="Prediction Successful">
              <div className="prediction-content">
                <div className="prediction-price">
                  {formatCurrency(prediction.data.predictedPrice)}
                </div>
                <div className="prediction-timestamp">
                  Predicted at: {new Date(prediction.data.timestamp).toLocaleString()}
                </div>
              </div>
            </Alert>
          </div>
        )}
      </Card>
    </div>
  );
};

