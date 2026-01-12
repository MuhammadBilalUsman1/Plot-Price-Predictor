"""Routes for housing prediction API."""
from flask import Blueprint, request, jsonify, current_app
from typing import Dict, Any

from src.config import Config
from src.utils.logger import setup_logger

logger = setup_logger(__name__)

prediction_bp = Blueprint('predictions', __name__)
config = Config()

def get_model_service():
    """Get model service from app context."""
    return current_app.model_service

@prediction_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    model_service = get_model_service()
    return jsonify({
        'status': 'ok',
        'service': 'ml-service',
        'model_loaded': model_service.model is not None
    })

@prediction_bp.route('/predict', methods=['POST'])
def predict():
    """Predict house price based on input features."""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Request body is required'}), 400
        
        # Validate required fields
        required_fields = [
            'longitude', 'latitude', 'housing_median_age', 'total_rooms',
            'total_bedrooms', 'population', 'households', 'median_income',
            'ocean_proximity'
        ]
        
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                'error': 'Missing required fields',
                'missing_fields': missing_fields
            }), 400
        
        # Validate ocean proximity
        if data['ocean_proximity'] not in config.VALID_OCEAN_PROXIMITY:
            return jsonify({
                'error': 'Invalid ocean_proximity',
                'valid_values': config.VALID_OCEAN_PROXIMITY
            }), 400
        
        # Validate numeric fields
        numeric_fields = [
            'longitude', 'latitude', 'housing_median_age', 'total_rooms',
            'total_bedrooms', 'population', 'households', 'median_income'
        ]
        
        for field in numeric_fields:
            try:
                data[field] = float(data[field])
            except (ValueError, TypeError):
                return jsonify({
                    'error': f'Invalid value for {field}. Must be a number.'
                }), 400
        
        # Get model service
        model_service = get_model_service()
        
        # Ensure model is loaded
        if model_service.model is None:
            logger.info("Model not loaded, attempting to load...")
            if not model_service.load_model():
                return jsonify({
                    'error': 'Model not available. Please train the model first.'
                }), 503
        
        # Make prediction
        prediction = model_service.predict(data)
        
        logger.info(f"Prediction made: ${prediction:,.2f}")
        
        return jsonify({
            'success': True,
            'prediction': round(prediction, 2),
            'input': data
        }), 200
        
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Prediction error: {e}", exc_info=True)
        return jsonify({
            'error': 'Internal server error',
            'message': str(e) if config.DEBUG else 'An error occurred during prediction'
        }), 500

@prediction_bp.route('/train', methods=['POST'])
def train_model():
    """Train or retrain the model."""
    try:
        logger.info("Training request received")
        model_service = get_model_service()
        metrics = model_service.train_model()
        
        # Update app context model service
        current_app.model_service = model_service
        
        return jsonify({
            'success': True,
            'message': 'Model trained successfully',
            'metrics': metrics
        }), 200
        
    except Exception as e:
        logger.error(f"Training error: {e}", exc_info=True)
        return jsonify({
            'error': 'Model training failed',
            'message': str(e) if config.DEBUG else 'An error occurred during training'
        }), 500

@prediction_bp.route('/model-info', methods=['GET'])
def model_info():
    """Get information about the loaded model."""
    model_service = get_model_service()
    info = {
        'loaded': model_service.model is not None,
        'feature_columns': model_service.feature_columns,
        'valid_ocean_proximity': config.VALID_OCEAN_PROXIMITY
    }
    
    return jsonify(info), 200

