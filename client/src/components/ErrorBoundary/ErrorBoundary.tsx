/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI
 */
import React, { Component } from 'react';
import type { ReactNode } from 'react';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { Alert } from '../Alert/Alert';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <Card title="Something went wrong" variant="outlined">
            <Alert variant="error" title="Application Error">
              <p>
                An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
              </p>
              {import.meta.env.MODE === 'development' && this.state.error && (
                <details className="error-boundary-details">
                  <summary className="error-boundary-summary">Error Details (Development Only)</summary>
                  <pre className="error-boundary-stack">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </Alert>
            <div className="error-boundary-actions">
              <Button onClick={this.handleReset} variant="primary">
                Try Again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Refresh Page
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}



