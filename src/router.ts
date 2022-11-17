import { UPDATE_STATUS } from '@prisma/client';
import { Router } from 'express';
import { body, check, oneOf } from 'express-validator';
import { checkValidationResults } from './modules/middlewares';

const router = Router();

/**
 * Products
 */
router.get('/product', (req, res) => {
  //res.status(200);
  res.json({ message: req.body.user });
});
router.get('/product/:id', (req, res) => {});
router.put(
  '/product/:id',
  body('name').isString(),
  checkValidationResults,
  (req, res) => {}
);
router.post(
  '/product',
  body('name').isString(),
  checkValidationResults,
  (req, res) => {}
);
router.delete('/product/:id', (req, res) => {});

/**
 * Update
 */
router.get('/update', (req, res) => {});
router.get('/update/:id', (req, res) => {});
router.put(
  '/update/:id',
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').isIn(Object.values(UPDATE_STATUS)),
  body('version').optional(),
  checkValidationResults,
  (req, res) => {}
);
router.post(
  '/update',
  body('title').isString(),
  body('body').isString(),
  checkValidationResults,
  (req, res) => {}
);
router.delete('/update/:id', (req, res) => {});

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
