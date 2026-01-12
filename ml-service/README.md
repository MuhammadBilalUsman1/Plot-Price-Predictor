# ML Service

Python-based Machine Learning service for housing price prediction using XGBoost.

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On Linux/Mac
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with correct paths (especially DATA_PATH)

## Running the Service

### Development

**Recommended way** (from ml-service directory with venv activated):

**Windows PowerShell:**
```powershell
# Activate virtual environment first
venv\Scripts\Activate.ps1

# Then run the service
python run.py
```

**Windows Command Prompt:**
```cmd
venv\Scripts\activate.bat
python run.py
```

**Or use the provided startup scripts:**
- PowerShell: `.\start.ps1`
- Batch file: `start.bat`

**Linux/Mac:**
```bash
source venv/bin/activate
python run.py
```

**Alternative methods:**

Using Python module syntax (from ml-service directory):
```bash
python -m src.app
```

Using Flask CLI:
```bash
# Windows PowerShell
$env:FLASK_APP="src/app.py"
flask run --port=5000

# Linux/Mac
export FLASK_APP=src/app.py
flask run --port=5000
```

### Production
Use a WSGI server like Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 src.app:create_app()
```

## API Endpoints

- `GET /` - Service information
- `GET /api/v1/health` - Health check
- `GET /api/v1/model-info` - Model information
- `POST /api/v1/predict` - Make prediction
- `POST /api/v1/train` - Train/retrain model

## Prediction Request Format

```json
{
  "longitude": -122.26,
  "latitude": 37.84,
  "housing_median_age": 50,
  "total_rooms": 2239,
  "total_bedrooms": 455,
  "population": 990,
  "households": 419,
  "median_income": 1.9911,
  "ocean_proximity": "NEAR BAY"
}
```

Valid `ocean_proximity` values:
- `NEAR BAY`
- `INLAND`
- `ISLAND`
- `NEAR OCEAN`
- `<1H OCEAN`

## Project Structure

```
ml-service/
├── src/
│   ├── config.py              # Configuration
│   ├── app.py                 # Flask application
│   ├── services/
│   │   └── model_service.py   # Model training and prediction logic
│   ├── routes/
│   │   └── prediction_routes.py  # API routes
│   └── utils/
│       └── logger.py          # Logging utility
├── models/                    # Trained models (generated)
├── run.py                     # Main entry point script
├── start.bat                  # Windows batch startup script
├── start.ps1                  # Windows PowerShell startup script
├── requirements.txt
└── README.md
```

