# Full Stack Housing Price Predictor

A production-ready full-stack application with machine learning integration for predicting housing prices.

## 🏗️ Architecture

```
Frontend (React) → Backend (Node.js) → ML Service (Python/Flask)
     ↓                  ↓                      ↓
  Port 5173        Port 3000              Port 5000
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- npm or yarn

### 1. ML Service Setup
```bash
cd ml-service
python -m venv venv
venv\Scripts\Activate.ps1  # Windows
pip install -r requirements.txt
python run.py
```

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file with:
# PORT=3000
# NODE_ENV=development
# FRONTEND_URL=http://localhost:5173
# ML_SERVICE_URL=http://localhost:5000
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
# Create .env file with:
# VITE_API_URL=http://localhost:3000/api
npm run dev
```

## 📁 Project Structure

```
├── client/              # React + TypeScript frontend
├── server/              # Node.js + Express backend
├── ml-service/          # Python + Flask ML service
├── 1553768847-housing.csv    # Dataset
└── XGBRegressor.ipynb        # Original model
```

## 🎯 Features

- ✅ **Full TypeScript** - Type-safe frontend and backend
- ✅ **Form Validation** - React Hook Form + Zod
- ✅ **ML Integration** - XGBoost model for predictions
- ✅ **Error Handling** - Comprehensive error boundaries
- ✅ **Responsive Design** - Mobile-first UI
- ✅ **Production Ready** - Optimized builds

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions
- [Client README](./client/README.md) - Frontend documentation
- [Server README](./server/README.md) - Backend documentation
- [ML Service README](./ml-service/README.md) - ML service documentation

## 🔧 Build Commands

### Frontend
```bash
cd client
npm run build      # Production build
npm run preview    # Preview production build
```

### Backend
```bash
cd server
npm run build      # Compile TypeScript
npm start          # Run production server
```

## 🌐 API Endpoints

### Backend API
- `GET /health` - Health check
- `POST /api/housing/predict` - Predict house price
- `GET /api/housing/model-info` - Model information
- `GET /api/housing/health` - ML service health

### ML Service API
- `GET /api/v1/health` - Health check
- `POST /api/v1/predict` - Make prediction
- `GET /api/v1/model-info` - Model info
- `POST /api/v1/train` - Train model

## 🧪 Testing

### Local Testing
1. Start ML service: `cd ml-service && python run.py`
2. Start backend: `cd server && npm run dev`
3. Start frontend: `cd client && npm run dev`
4. Open: http://localhost:5173

### Production Build Test
```bash
# Frontend
cd client && npm run build && npm run preview

# Backend
cd server && npm run build && npm start
```

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

**Quick Deploy Options:**
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Railway, Render, Heroku
- **ML Service**: Railway, Render, Google Cloud Run

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Hook Form
- Zod
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Zod
- Axios
- Nodemon

### ML Service
- Python 3.11
- Flask
- XGBoost
- scikit-learn
- pandas

## 📝 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ using modern software engineering practices**
