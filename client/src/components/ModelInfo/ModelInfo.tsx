/**
 * Model Information Component
 * Displays model status and information
 */
import React from 'react';
import { Card } from '../Card/Card';
import { Alert } from '../Alert/Alert';
import { useModelInfo } from '../../hooks/useModelInfo';
import './ModelInfo.css';

export const ModelInfo: React.FC = () => {
  const { modelInfo, loading, error } = useModelInfo();

  if (loading) {
    return (
      <Card title="Model Information" variant="outlined">
        <div className="model-info-loading">Loading model information...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Model Information" variant="outlined">
        <Alert variant="warning" title="Unable to fetch model information">
          {error}
        </Alert>
      </Card>
    );
  }

  if (!modelInfo) {
    return null;
  }

  return (
    <Card title="Model Information" variant="outlined" className="model-info-card">
      <div className="model-info">
        <div className="model-info-item">
          <span className="model-info-label">Model Status:</span>
          <span className={`model-info-value ${modelInfo.modelLoaded ? 'model-info-value--loaded' : 'model-info-value--not-loaded'}`}>
            {modelInfo.modelLoaded ? '✓ Loaded' : '✗ Not Loaded'}
          </span>
        </div>

        {modelInfo.modelLoaded && (
          <>
            <div className="model-info-item">
              <span className="model-info-label">Features:</span>
              <span className="model-info-value">{modelInfo.featureColumns.length} features</span>
            </div>

            <div className="model-info-item">
              <span className="model-info-label">Ocean Proximity Options:</span>
              <div className="model-info-tags">
                {modelInfo.validOceanProximity.map((option) => (
                  <span key={option} className="model-info-tag">
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {!modelInfo.modelLoaded && (
          <Alert variant="warning" className="model-info-alert">
            The model is not currently loaded. Predictions may not be available.
          </Alert>
        )}
      </div>
    </Card>
  );
};







