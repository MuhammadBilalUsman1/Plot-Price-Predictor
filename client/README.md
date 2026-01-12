# Frontend - Housing Price Predictor

Modern React frontend application built with TypeScript, Vite, and React Hook Form.

## 🚀 Features

- ✅ **Type-Safe**: Full TypeScript support throughout
- ✅ **Form Validation**: React Hook Form with Zod validation
- ✅ **Component Library**: Reusable, accessible UI components
- ✅ **Error Handling**: Comprehensive error boundaries and error states
- ✅ **Loading States**: Proper loading indicators
- ✅ **Responsive Design**: Mobile-first, responsive layout
- ✅ **Modern UI**: Clean, professional design with CSS variables
- ✅ **API Integration**: Axios-based service layer

## 📁 Project Structure

```
client/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Alert/           # Alert/notification component
│   │   ├── Button/          # Button component
│   │   ├── Card/            # Card container component
│   │   ├── ErrorBoundary/   # Error boundary wrapper
│   │   ├── HousingPredictionForm/  # Main prediction form
│   │   ├── Input/           # Form input component
│   │   ├── Layout/          # Layout components (Header, Footer)
│   │   ├── ModelInfo/       # Model status display
│   │   └── Select/          # Dropdown select component
│   ├── hooks/               # Custom React hooks
│   │   ├── useHousingPrediction.ts  # Prediction hook
│   │   └── useModelInfo.ts          # Model info hook
│   ├── services/            # API service layer
│   │   ├── api.service.ts   # Base API client
│   │   └── housing.service.ts       # Housing API service
│   ├── types/               # TypeScript type definitions
│   │   ├── api.types.ts     # General API types
│   │   └── housing.types.ts # Housing-specific types
│   ├── utils/               # Utility functions
│   │   ├── constants.ts     # Application constants
│   │   └── validation.ts    # Validation schemas
│   ├── App.tsx              # Main App component
│   ├── App.css              # App-specific styles
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and CSS variables
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
# Copy example and update if needed
# Vite uses VITE_ prefix for environment variables
VITE_API_URL=http://localhost:3000/api
```

3. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🏗️ Architecture

### Component Architecture

```
App
├── ErrorBoundary (catches React errors)
└── Layout
    ├── Header
    ├── Main Content
    │   ├── ModelInfo (displays model status)
    │   └── HousingPredictionForm
    │       ├── Form Fields (Input, Select components)
    │       ├── Validation (React Hook Form + Zod)
    │       └── Results Display
    └── Footer
```

### Data Flow

1. **User Input** → React Hook Form
2. **Validation** → Zod schema validation
3. **API Call** → Housing Service → API Service → Backend
4. **Response** → Custom Hook → Component State
5. **UI Update** → React re-render

### Service Layer

- **API Service**: Base Axios client with interceptors
- **Housing Service**: Domain-specific API calls
- **Custom Hooks**: React hooks for data fetching and state management

## 🎨 Styling

### CSS Variables

The application uses CSS custom properties for theming:

```css
--color-primary: #3b82f6
--color-secondary: #10b981
--color-danger: #ef4444
--color-success: #22c55e
/* ... and more */
```

### Component Styling

Each component has its own CSS file following BEM-like naming:
- `.component-name`
- `.component-name--variant`
- `.component-name__element`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api` |

### Vite Configuration

The Vite dev server is configured to proxy `/api` requests to the backend:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  }
}
```

## 📦 Key Dependencies

### Production Dependencies

- **react** & **react-dom** - React framework
- **axios** - HTTP client
- **react-hook-form** - Form management
- **zod** - Schema validation
- **@hookform/resolvers** - Zod resolver for React Hook Form

### Development Dependencies

- **typescript** - Type safety
- **vite** - Build tool and dev server
- **@vitejs/plugin-react-swc** - Fast React refresh
- **eslint** - Linting
- **typescript-eslint** - TypeScript ESLint rules

## 🧩 Components

### UI Components

- **Button**: Flexible button with variants (primary, secondary, danger, outline)
- **Input**: Form input with validation states
- **Select**: Dropdown select with options
- **Card**: Container component with variants
- **Alert**: Notification/alert component
- **Layout**: Page layout with Header and Footer

### Feature Components

- **HousingPredictionForm**: Main prediction form with validation
- **ModelInfo**: Displays model status and information
- **ErrorBoundary**: Catches and displays React errors

## 🎯 Best Practices

### Code Quality

✅ **TypeScript**: Full type coverage  
✅ **Component Composition**: Reusable, composable components  
✅ **Separation of Concerns**: Services, hooks, components separated  
✅ **Error Handling**: Error boundaries and proper error states  
✅ **Loading States**: Proper loading indicators  
✅ **Accessibility**: ARIA labels, keyboard navigation  
✅ **Responsive Design**: Mobile-first approach  

### Performance

- Code splitting (automatic with Vite)
- Optimized builds
- Fast refresh in development
- Minimal bundle size

## 🚀 Production Build

```bash
npm run build
```

Build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🔍 Testing the Integration

1. **Start Backend**: Ensure backend is running on `http://localhost:3000`
2. **Start ML Service**: Ensure ML service is running on `http://localhost:5000`
3. **Start Frontend**: Run `npm run dev`
4. **Open Browser**: Navigate to `http://localhost:5173`
5. **Test Form**: Fill in the prediction form and submit

## 📝 Form Fields

The prediction form includes:

- **Longitude** (-180 to 180)
- **Latitude** (-90 to 90)
- **Housing Median Age** (integer, 0-200)
- **Total Rooms** (integer, positive)
- **Total Bedrooms** (integer, >= 0)
- **Population** (integer, >= 0)
- **Households** (integer, positive)
- **Median Income** (float, positive, max 20)
- **Ocean Proximity** (dropdown: NEAR BAY, INLAND, ISLAND, NEAR OCEAN, <1H OCEAN)

## 🐛 Troubleshooting

### API Connection Issues

- Check that backend is running on port 3000
- Verify `VITE_API_URL` environment variable
- Check browser console for CORS errors

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`
- Verify all dependencies are installed

### Form Validation Issues

- Check browser console for validation errors
- Verify Zod schema matches backend validation
- Ensure all required fields are filled

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
