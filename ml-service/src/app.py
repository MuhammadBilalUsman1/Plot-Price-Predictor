"""Flask application for ML service."""
from flask import Flask
from flask_cors import CORS
import os

from src.config import Config
from src.routes.prediction_routes import prediction_bp
from src.services.model_service import ModelService
from src.utils.logger import setup_logger

logger = setup_logger(__name__)

def create_app() -> Flask:
    """Create and configure Flask application."""
    app = Flask(__name__)
    config = Config()
    
    # CORS configuration
    CORS(app, resources={
        r"/*": {
            "origins": "*",  # In production, specify exact origins
            "methods": ["GET", "POST"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Initialize and load model on startup
    model_service = ModelService()
    logger.info("Attempting to load model on startup...")
    model_service.load_model()
    
    # Store model service in app context for routes to access
    app.model_service = model_service
    
    # Register blueprints
    app.register_blueprint(prediction_bp, url_prefix='/api/v1')
    
    @app.route('/')
    def index():
        return {
            'service': 'ML Prediction Service',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/v1/health',
                'predict': '/api/v1/predict',
                'train': '/api/v1/train',
                'model_info': '/api/v1/model-info'
            }
        }
    
    return app

if __name__ == '__main__':
    app = create_app()
    config = Config()
    
    logger.info(f"Starting ML service on port {config.PORT}")
    app.run(host='0.0.0.0', port=config.PORT, debug=config.DEBUG)
