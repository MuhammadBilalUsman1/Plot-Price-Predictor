import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Layout } from './components/Layout/Layout';
import { HousingPredictionForm } from './components/HousingPredictionForm/HousingPredictionForm';
import { ModelInfo } from './components/ModelInfo/ModelInfo';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <ModelInfo />
        <HousingPredictionForm />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
