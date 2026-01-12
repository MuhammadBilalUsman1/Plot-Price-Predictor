"""Model service for training and loading the housing prediction model."""
import pandas as pd
import numpy as np
from pathlib import Path
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error
from xgboost import XGBRegressor
from typing import Dict, Tuple, Optional

from src.config import Config
from src.utils.logger import setup_logger

logger = setup_logger(__name__)

class ModelService:
    """Service for managing the ML model."""
    
    def __init__(self):
        self.model: Optional[Pipeline] = None
        self.config = Config()
        self.feature_columns = [
            'longitude', 'latitude', 'housing_median_age', 'total_rooms',
            'total_bedrooms', 'population', 'households', 'median_income',
            'ocean_proximity'
        ]
    
    def load_data(self) -> Tuple[pd.DataFrame, pd.Series]:
        """Load and prepare data from CSV."""
        logger.info(f"Loading data from {self.config.DATA_PATH}")
        
        if not Path(self.config.DATA_PATH).exists():
            raise FileNotFoundError(f"Data file not found: {self.config.DATA_PATH}")
        
        df = pd.read_csv(self.config.DATA_PATH)
        
        # Features and target
        X = df.drop("median_house_value", axis=1)
        y = np.log1p(df["median_house_value"])  # log transform
        
        logger.info(f"Data loaded: {len(df)} samples, {len(X.columns)} features")
        return X, y
    
    def train_model(self) -> Dict[str, float]:
        """Train the housing prediction model."""
        logger.info("Starting model training...")
        
        X, y = self.load_data()
        
        # Categorical columns
        cat_cols = ["ocean_proximity"]
        num_cols = [col for col in X.columns if col not in cat_cols]
        
        # Preprocessing
        preprocessor = ColumnTransformer(
            transformers=[
                ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
                ("num", "passthrough", num_cols)
            ]
        )
        
        # Model
        model = XGBRegressor(
            n_estimators=500,
            learning_rate=0.05,
            max_depth=7,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=self.config.RANDOM_STATE
        )
        
        # Pipeline
        pipeline = Pipeline([
            ("preprocessor", preprocessor),
            ("model", model)
        ])
        
        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, 
            test_size=self.config.TEST_SIZE, 
            random_state=self.config.RANDOM_STATE
        )
        
        # Train
        logger.info("Training model...")
        pipeline.fit(X_train, y_train)
        
        # Evaluate
        preds = np.expm1(pipeline.predict(X_test))
        actual = np.expm1(y_test)
        mae = mean_absolute_error(actual, preds)
        
        logger.info(f"Model training completed. MAE: {mae:.2f}")
        
        # Save model
        self.model = pipeline
        self._save_model()
        
        return {
            'mae': float(mae),
            'train_samples': len(X_train),
            'test_samples': len(X_test)
        }
    
    def _save_model(self) -> None:
        """Save the trained model to disk."""
        model_dir = Path(self.config.MODEL_PATH).parent
        model_dir.mkdir(parents=True, exist_ok=True)
        
        joblib.dump(self.model, self.config.MODEL_PATH)
        logger.info(f"Model saved to {self.config.MODEL_PATH}")
    
    def load_model(self) -> bool:
        """Load the trained model from disk."""
        model_path = Path(self.config.MODEL_PATH)
        
        if not model_path.exists():
            logger.warning(f"Model not found at {model_path}. Training new model...")
            self.train_model()
            return True
        
        try:
            self.model = joblib.load(model_path)
            logger.info(f"Model loaded from {model_path}")
            return True
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            return False
    
    def predict(self, features: Dict[str, any]) -> float:
        """Make a prediction using the loaded model."""
        if self.model is None:
            raise RuntimeError("Model not loaded. Call load_model() first.")
        
        # Validate input features
        missing_features = set(self.feature_columns) - set(features.keys())
        if missing_features:
            raise ValueError(f"Missing required features: {missing_features}")
        
        # Validate ocean proximity
        if features['ocean_proximity'] not in self.config.VALID_OCEAN_PROXIMITY:
            raise ValueError(
                f"Invalid ocean_proximity. Must be one of: {self.config.VALID_OCEAN_PROXIMITY}"
            )
        
        # Create DataFrame with correct column order
        input_data = pd.DataFrame([features], columns=self.feature_columns)
        
        # Predict (model outputs log-transformed value)
        log_prediction = self.model.predict(input_data)[0]
        
        # Transform back from log space
        prediction = np.expm1(log_prediction)
        
        return float(prediction)



