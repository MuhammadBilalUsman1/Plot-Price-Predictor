# Frontend Architecture

## Overview

The frontend is built using a **component-based architecture** with clear separation of concerns, following React best practices and modern development patterns.

## Architecture Principles

### 1. Component-Based Design
- **Atomic Components**: Small, reusable UI components (Button, Input, Card)
- **Composition**: Components composed to build larger features
- **Single Responsibility**: Each component has one clear purpose

### 2. Separation of Concerns

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Components, Layout, UI)               │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│         State Management                │
│  (Custom Hooks, React State)            │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│         Service Layer                   │
│  (API Services, Data Fetching)          │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│         Validation Layer                │
│  (Zod Schemas, Form Validation)         │
└─────────────────────────────────────────┘
```

### 3. Data Flow

```
User Action
    ↓
Form Component (React Hook Form)
    ↓
Validation (Zod Schema)
    ↓
Custom Hook (useHousingPrediction)
    ↓
Service Layer (housingService)
    ↓
API Service (Axios Client)
    ↓
Backend API
    ↓
Response flows back up the chain
```

## Component Hierarchy

```
App (Root)
│
├── ErrorBoundary (Global Error Handler)
│   │
│   └── Layout (Page Structure)
│       │
│       ├── Header (Navigation/Branding)
│       │
│       ├── Main Content
│       │   │
│       │   ├── ModelInfo (Model Status Display)
│       │   │   └── Card
│       │   │       └── Alert (if error/warning)
│       │   │
│       │   └── HousingPredictionForm (Main Feature)
│       │       └── Card
│       │           ├── Form (React Hook Form)
│       │           │   ├── Input Components (9 fields)
│       │           │   ├── Select Component (ocean_proximity)
│       │           │   └── Button Component (Submit/Reset)
│       │           │
│       │           └── Results Display
│       │               └── Alert (Success with prediction)
│       │
│       └── Footer (Metadata/Links)
```

## Service Layer Architecture

### API Service (Base Layer)

```typescript
ApiService (Singleton)
├── Axios Instance
├── Request Interceptor (Auth, Headers)
└── Response Interceptor (Error Handling)
```

**Responsibilities**:
- Base URL configuration
- Request/response interceptors
- Global error handling
- Timeout configuration

### Housing Service (Domain Layer)

```typescript
housingService
├── predict(input) → Promise<PredictionResponse>
├── getModelInfo() → Promise<ModelInfoResponse>
└── checkHealth() → Promise<HealthCheckResponse>
```

**Responsibilities**:
- Domain-specific API calls
- Type-safe request/response handling
- Business logic abstraction

## Custom Hooks Pattern

### useHousingPrediction Hook

```typescript
{
  predict: (input) => Promise<void>,
  prediction: PredictionResponse | null,
  loading: boolean,
  error: string | null,
  reset: () => void
}
```

**Responsibilities**:
- Encapsulate prediction logic
- Manage loading/error/prediction state
- Provide clean interface to components

### useModelInfo Hook

```typescript
{
  modelInfo: ModelInfo | null,
  loading: boolean,
  error: string | null,
  refetch: () => Promise<void>
}
```

**Responsibilities**:
- Fetch model information on mount
- Manage model info state
- Provide refetch capability

## Validation Architecture

### Zod Schema Validation

```typescript
housingPredictionSchema (Zod Schema)
├── Field-level validation
├── Type coercion
└── Error messages
```

**Integration with React Hook Form**:
- `zodResolver` converts Zod errors to React Hook Form format
- Real-time validation on user input
- Submit-time validation before API call

## Error Handling Strategy

### Three-Tier Error Handling

1. **Component Level** (try/catch in hooks)
   - Catches API errors
   - Sets error state
   - Displays user-friendly messages

2. **Service Level** (Axios interceptors)
   - Transforms HTTP errors
   - Provides consistent error format
   - Handles network errors

3. **Application Level** (Error Boundary)
   - Catches React rendering errors
   - Provides fallback UI
   - Logs errors for debugging

### Error Display Flow

```
Error Occurs
    ↓
Service Interceptor → Transform Error
    ↓
Custom Hook → Set Error State
    ↓
Component → Display Alert
    ↓
User Sees Friendly Error Message
```

## State Management

### Local Component State

- Form state managed by React Hook Form
- UI state (loading, errors) managed by custom hooks
- Minimal useState usage (only when necessary)

### Global State (Future Enhancement)

Potential additions:
- Context API for theme/authentication
- State management library (Zustand, Redux) if needed
- URL state management for filters/search

## Styling Architecture

### CSS Architecture

```
index.css (Global Styles)
├── CSS Variables (Theme)
├── Reset/Normalize
└── Typography

Component CSS (Scoped)
├── Component styles
├── Variants (BEM-like)
└── Responsive breakpoints
```

### CSS Variables (Theme System)

```css
--color-primary
--color-secondary
--color-danger
--color-success
--spacing-*
--shadow-*
--radius-*
```

**Benefits**:
- Easy theming
- Consistent design
- Runtime theme switching capability

## Performance Optimizations

### Built-in Optimizations

1. **React Fast Refresh**: Instant updates in development
2. **Code Splitting**: Automatic with Vite
3. **Tree Shaking**: Unused code elimination
4. **Minification**: Production builds are minified

### Manual Optimizations

1. **React.memo**: Prevent unnecessary re-renders (if needed)
2. **useMemo/useCallback**: Memoize expensive computations
3. **Lazy Loading**: Code splitting for large components

## Type Safety

### TypeScript Configuration

- Strict mode enabled
- Full type coverage
- Type inference where possible
- Explicit types for public APIs

### Type Definitions

```
types/
├── api.types.ts      # General API types
└── housing.types.ts  # Domain-specific types
```

**Type Flow**:
```
API Response → Type Definition → Service → Hook → Component
```

## Testing Strategy (Future)

### Unit Tests
- Component tests (React Testing Library)
- Hook tests (React Hooks Testing Library)
- Service tests (Jest)

### Integration Tests
- Form submission flow
- API integration
- Error scenarios

### E2E Tests
- Complete user workflows
- Cross-browser testing

## Accessibility (a11y)

### Current Implementations

✅ **ARIA Labels**: Proper labeling of form fields  
✅ **Error Announcements**: Errors announced to screen readers  
✅ **Keyboard Navigation**: All interactive elements keyboard accessible  
✅ **Focus Management**: Visible focus indicators  
✅ **Semantic HTML**: Proper HTML structure  

### Future Enhancements

- Skip navigation links
- Keyboard shortcuts
- Screen reader testing
- WCAG compliance audit

## Build & Deployment

### Development

```bash
npm run dev
```
- Fast HMR (Hot Module Replacement)
- Source maps
- Fast refresh

### Production

```bash
npm run build
```
- Optimized bundle
- Minified code
- Asset optimization
- Code splitting

### Deployment Targets

- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Container**: Docker + Nginx
- **Server**: Node.js server (Express static)

## Code Organization Principles

1. **Feature-Based Organization**: Related code grouped together
2. **Barrel Exports**: Centralized exports via index.ts
3. **Colocation**: Styles, types, and components together
4. **Naming Conventions**: Clear, descriptive names
5. **File Structure**: Consistent structure across features

## Future Enhancements

### Planned Features

- [ ] Authentication integration
- [ ] Prediction history
- [ ] Charts/visualizations
- [ ] Export predictions
- [ ] Favorites/bookmarks
- [ ] Multi-language support (i18n)

### Technical Improvements

- [ ] State management library (if needed)
- [ ] Testing suite
- [ ] Storybook for component documentation
- [ ] Performance monitoring
- [ ] Analytics integration







