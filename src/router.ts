import { UPDATE_STATUS } from '@prisma/client';
import { Router } from 'express';
import { body } from 'express-validator';

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdatesByUser,
  updateUpdate,
} from './handlers/update';
import { checkValidationResults } from './modules/middlewares';

const router = Router();

/**
 * Products
 */
router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  checkValidationResults,
  updateProduct
);
router.post(
  '/product',
  body('name').isString(),
  checkValidationResults,
  createProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/updates', getUpdatesByUser);
router.get('/update/:id', getUpdate);
router.put(
  '/update/:id',
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').isIn(Object.values(UPDATE_STATUS)).optional(),
  body('version').optional(),
  checkValidationResults,
  updateUpdate
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  checkValidationResults,
  createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update points
 */
router.get('/updatepoint', (req, res) => {});
router.get('/updatepoint/:id', (req, res) => {});
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  checkValidationResults,
  (req, res) => {}
);
router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').isString(),
  checkValidationResults,
  (req, res) => {}
);
router.delete('/updatepoint/:id', (req, res) => {});

export default router;
