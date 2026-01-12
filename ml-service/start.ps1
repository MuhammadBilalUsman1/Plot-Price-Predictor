# PowerShell start script for ML Service

# Check if virtual environment exists
if (-not (Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "Virtual environment not found. Please create it first:" -ForegroundColor Red
    Write-Host "python -m venv venv" -ForegroundColor Yellow
    exit 1
}

# Activate virtual environment
& "venv\Scripts\Activate.ps1"

# Run the application
python run.py



