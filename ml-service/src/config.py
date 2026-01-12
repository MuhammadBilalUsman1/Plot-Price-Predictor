"""Configuration settings for the ML service."""
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

class Config:
    """Application configuration."""
    PORT = int(os.getenv('FLASK_PORT', 5000))
    ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = ENV == 'development'
    
    # Model configuration
    MODEL_PATH = os.getenv('MODEL_PATH', str(BASE_DIR / 'models' / 'housing_model.pkl'))
    DATA_PATH = os.getenv('DATA_PATH', str(BASE_DIR.parent / '1553768847-housing.csv'))
    
    # Model training configuration
    RANDOM_STATE = 42
    TEST_SIZE = 0.2
    
    # Valid ocean proximity values
    VALID_OCEAN_PROXIMITY = [
        'NEAR BAY',
        'INLAND',
        'ISLAND',
        'NEAR OCEAN',
        '<1H OCEAN'
    ]



