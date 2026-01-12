import { Router } from 'express';
import { getExample, createExample } from '../controllers/example.controller.js';
import { validate } from '../middleware/validation.middleware.js';
import { createExampleSchema } from '../validations/example.validation.js';

const router = Router();

// GET /api/example
router.get('/', getExample);

// POST /api/example (with validation)
router.post('/', validate(createExampleSchema), createExample);

export default router;

