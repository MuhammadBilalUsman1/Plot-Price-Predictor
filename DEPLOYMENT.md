# Deployment Guide

Complete guide for deploying the full-stack application with ML integration.

## 🚀 Quick Deployment Checklist

- [ ] All services build successfully
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Services tested locally
- [ ] Production builds created

## 📦 Build Commands

### Frontend (Client)
```bash
cd client
npm install
npm run build
```
**Output**: `client/dist/` directory ready for static hosting

### Backend (Server)
```bash
cd server
npm install
npm run build
```
**Output**: `server/dist/` directory with compiled JavaScript

### ML Service (Python)
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
# Model will auto-train on first run
```

## 🌐 Deployment Options

### Option 1: Static Hosting (Frontend) + Cloud Services

#### Frontend Deployment
**Recommended Platforms:**
- **Vercel** (Recommended)
  ```bash
  npm install -g vercel
  cd client
  vercel
  ```

- **Netlify**
  ```bash
  npm install -g netlify-cli
  cd client
  netlify deploy --prod
  ```

- **GitHub Pages**
  - Build the project
  - Deploy `dist/` folder to GitHub Pages

**Environment Variables for Frontend:**
```env
VITE_API_URL=https://your-backend-api.com/api
```

#### Backend Deployment
**Recommended Platforms:**
- **Railway**
  - Connect GitHub repo
  - Set environment variables
  - Deploy automatically

- **Render**
  - Create Web Service
  - Set build command: `npm install && npm run build`
  - Set start command: `npm start`

- **Heroku**
  ```bash
  heroku create your-app-name
  git push heroku main
  ```

- **DigitalOcean App Platform**
  - Connect repository
  - Auto-detect Node.js
  - Configure environment variables

**Environment Variables for Backend:**
```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
ML_SERVICE_URL=https://your-ml-service.com
```

#### ML Service Deployment
**Recommended Platforms:**
- **Railway**
  - Deploy Python service
  - Set environment variables
  - Auto-deploy on push

- **Render**
  - Create Web Service
  - Set build command: `pip install -r requirements.txt`
  - Set start command: `python run.py`

- **Google Cloud Run**
  ```bash
  gcloud run deploy ml-service --source .
  ```

- **AWS Lambda** (with container)
  - Package as Docker container
  - Deploy to Lambda

**Environment Variables for ML Service:**
```env
FLASK_PORT=5000
FLASK_ENV=production
MODEL_PATH=./models/housing_model.pkl
DATA_PATH=./data/housing.csv
```

### Option 2: Docker Deployment (All Services)

#### Create Dockerfiles

**Frontend Dockerfile** (`client/Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Backend Dockerfile** (`server/Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

**ML Service Dockerfile** (`ml-service/Dockerfile`):
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "run.py"]
```

#### Docker Compose (All Services)
Create `docker-compose.yml` in root:
```yaml
version: '3.8'

services:
  ml-service:
    build: ./ml-service
    ports:
      - "5000:5000"
    environment:
      - FLASK_PORT=5000
      - FLASK_ENV=production
    volumes:
      - ./ml-service/models:/app/models
      - ./1553768847-housing.csv:/app/data/housing.csv

  backend:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=production
      - ML_SERVICE_URL=http://ml-service:5000
    depends_on:
      - ml-service

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend
```

**Deploy with Docker Compose:**
```bash
docker-compose up -d
```

### Option 3: Kubernetes Deployment

Create Kubernetes manifests for each service and deploy to:
- Google Kubernetes Engine (GKE)
- Amazon EKS
- Azure AKS
- DigitalOcean Kubernetes

## 🔐 Environment Variables Setup

### Production Environment Variables

#### Frontend (.env.production)
```env
VITE_API_URL=https://api.yourdomain.com/api
```

#### Backend (.env)
```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
ML_SERVICE_URL=https://ml-service.yourdomain.com
```

#### ML Service (.env)
```env
FLASK_PORT=5000
FLASK_ENV=production
MODEL_PATH=./models/housing_model.pkl
DATA_PATH=./data/housing.csv
```

## 📋 Pre-Deployment Checklist

### Frontend
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] Environment variables set
- [ ] API URL configured correctly
- [ ] Test production build locally: `npm run preview`

### Backend
- [ ] Build succeeds: `npm run build`
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] ML service URL is correct
- [ ] CORS configured for production frontend URL
- [ ] Health check endpoint working

### ML Service
- [ ] Model trained and saved
- [ ] All Python dependencies installed
- [ ] Environment variables set
- [ ] Data file path is correct
- [ ] Model loads successfully
- [ ] Health check endpoint working

## 🧪 Testing Before Deployment

### Local Testing
1. **Start all services locally:**
   ```bash
   # Terminal 1 - ML Service
   cd ml-service && python run.py
   
   # Terminal 2 - Backend
   cd server && npm run dev
   
   # Terminal 3 - Frontend
   cd client && npm run dev
   ```

2. **Test endpoints:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000/api
   - ML Service: http://localhost:5000/api/v1

3. **Test prediction flow:**
   - Fill form on frontend
   - Submit prediction
   - Verify result displays

### Production Build Testing
```bash
# Frontend
cd client
npm run build
npm run preview

# Backend
cd server
npm run build
npm start
```

## 🚢 Deployment Steps

### Step 1: Prepare Code
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push
```

### Step 2: Deploy ML Service
1. Choose deployment platform
2. Set environment variables
3. Deploy and verify health endpoint

### Step 3: Deploy Backend
1. Set ML_SERVICE_URL to deployed ML service
2. Set FRONTEND_URL to your frontend domain
3. Deploy and verify API endpoints

### Step 4: Deploy Frontend
1. Set VITE_API_URL to deployed backend
2. Build and deploy
3. Verify frontend loads and connects to backend

### Step 5: Verify Integration
1. Test prediction form
2. Check all API endpoints
3. Verify error handling
4. Test on mobile devices

## 🔍 Post-Deployment Verification

### Health Checks
- [ ] Frontend loads correctly
- [ ] Backend health: `GET /health`
- [ ] ML Service health: `GET /api/v1/health`
- [ ] Model info endpoint works
- [ ] Prediction endpoint works

### Performance Checks
- [ ] Page load time < 3 seconds
- [ ] API response time < 2 seconds
- [ ] Prediction response time < 5 seconds

### Security Checks
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Environment variables secured
- [ ] No sensitive data in client code

## 📊 Monitoring & Logging

### Recommended Tools
- **Application Monitoring**: Sentry, LogRocket
- **Performance**: Google Analytics, Vercel Analytics
- **Uptime**: UptimeRobot, Pingdom
- **Logs**: Logtail, Papertrail

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd client && npm ci && npm run build
      - run: # Deploy to hosting platform

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd server && npm ci && npm run build
      - run: # Deploy to hosting platform

  deploy-ml-service:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
      - run: cd ml-service && pip install -r requirements.txt
      - run: # Deploy to hosting platform
```

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Verify FRONTEND_URL in backend matches actual frontend domain
   - Check CORS configuration in backend

2. **API Connection Errors**
   - Verify VITE_API_URL in frontend
   - Check backend is running and accessible
   - Verify network/firewall settings

3. **ML Service Not Responding**
   - Check ML_SERVICE_URL in backend
   - Verify ML service is running
   - Check model file exists and is accessible

4. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js/Python versions
   - Verify all dependencies are in package.json/requirements.txt

## 📝 Deployment Notes

- Always test production builds locally before deploying
- Use environment variables for all configuration
- Keep sensitive data out of version control
- Monitor logs after deployment
- Set up alerts for service downtime
- Regular backups of model files

## ✅ Success Criteria

Your deployment is successful when:
- ✅ All three services are running
- ✅ Frontend loads and displays correctly
- ✅ API endpoints respond correctly
- ✅ Predictions work end-to-end
- ✅ No console errors
- ✅ Performance is acceptable

---

**Ready to deploy!** 🚀





