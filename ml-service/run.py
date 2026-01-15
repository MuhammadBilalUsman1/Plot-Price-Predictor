"""
Run script for the ML service.
This script ensures proper Python path setup.
"""
import sys
from pathlib import Path

# Add the ml-service directory to Python path
ml_service_dir = Path(__file__).parent
sys.path.insert(0, str(ml_service_dir))

# Now import and run the app
from src.app import create_app
from src.config import Config
from src.utils.logger import setup_logger

if __name__ == '__main__':
    logger = setup_logger(__name__)
    app = create_app()
    config = Config()
    
    logger.info(f"Starting ML service on port {config.PORT}")
    app.run(host='0.0.0.0', port=config.PORT, debug=config.DEBUG)







