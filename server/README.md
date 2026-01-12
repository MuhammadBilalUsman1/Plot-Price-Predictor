# Backend Server

Production-ready Node.js backend server built with Express and TypeScript.

## Features

- ✅ **Express.js** - Fast, minimalist web framework
- ✅ **TypeScript** - Type-safe development
- ✅ **Nodemon** - Auto-restart on file changes
- ✅ **Morgan** - HTTP request logger
- ✅ **Helmet** - Security headers middleware
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Compression** - Response compression (gzip)
- ✅ **Rate Limiting** - API abuse protection
- ✅ **Cookie Parser** - Cookie handling
- ✅ **Zod** - Schema validation
- ✅ **Error Handling** - Centralized error handling
- ✅ **Async Handler** - Async/await error wrapper

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Development

Run the server in development mode with hot reload (using Nodemon):
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in `.env`)

Nodemon will automatically restart the server when you make changes to any `.ts` files.

## Production

Build the TypeScript code:
```bash
npm run build
```

Run the production server:
```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server with Nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Type check without building

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api` - API information
- `GET /api/example` - Example GET endpoint
- `POST /api/example` - Example POST endpoint (with Zod validation)

## Project Structure

```
server/
├── src/
│   ├── controllers/       # Request handlers
│   ├── routes/            # Route definitions
│   ├── middleware/        # Custom middleware (validation, error handling, async)
│   ├── validations/       # Zod validation schemas
│   ├── app.ts             # Express app setup with all middleware
│   └── index.ts           # Server entry point
├── dist/                  # Compiled JavaScript (generated)
├── nodemon.json           # Nodemon configuration
├── package.json
├── tsconfig.json
└── .env.example
```

## Middleware Stack

1. **Helmet** - Security headers
2. **CORS** - Cross-origin requests
3. **Compression** - Response compression
4. **Rate Limiting** - API rate limiting (100 req/15min per IP)
5. **Body Parser** - JSON and URL-encoded body parsing
6. **Cookie Parser** - Cookie parsing
7. **Morgan** - HTTP request logging
8. **Routes** - API routes
9. **404 Handler** - Not found handler
10. **Error Handler** - Centralized error handling

## Example Usage

### Creating a new route with validation:

1. Create validation schema in `src/validations/`:
```typescript
import { z } from 'zod';

export const mySchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
  }),
});
```

2. Create controller in `src/controllers/`:
```typescript
import { asyncHandler } from '../middleware/async.middleware.js';

export const myController = asyncHandler(async (req, res) => {
  // Your logic here
  res.json({ success: true });
});
```

3. Create route in `src/routes/`:
```typescript
import { validate } from '../middleware/validation.middleware.js';
import { mySchema } from '../validations/my.validation.js';
import { myController } from '../controllers/my.controller.js';

router.post('/', validate(mySchema), myController);
```

