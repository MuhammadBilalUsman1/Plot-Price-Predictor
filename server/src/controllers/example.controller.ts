import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/async.middleware.js';
import { AppError } from '../middleware/error.middleware.js';
import { CreateExampleInput } from '../validations/example.validation.js';

export const getExample = asyncHandler(async (req: Request, res: Response) => {
  res.json({
    message: 'Example GET endpoint',
    data: {
      items: [
        { id: 1, name: 'Item 1', description: 'This is item 1' },
        { id: 2, name: 'Item 2', description: 'This is item 2' }
      ],
      timestamp: new Date().toISOString(),
      total: 2
    }
  });
});

export const createExample = asyncHandler(async (req: Request<{}, {}, CreateExampleInput>, res: Response) => {
  const { name, email, age } = req.body;

  // Example: Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100));

  // Example: Business logic validation (Zod handles schema validation)
  if (name.toLowerCase() === 'error') {
    throw new AppError('Invalid name provided', 400);
  }

  res.status(201).json({
    message: 'Example created successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      name,
      email: email || null,
      age: age || null,
      createdAt: new Date().toISOString()
    }
  });
});

