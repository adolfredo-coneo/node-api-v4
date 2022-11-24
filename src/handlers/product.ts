import { NextFunction, Request, Response } from 'express';
import prisma from '../modules/db';

//Get all products
export const getProducts = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

//Get a product
export const getProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.findFirst({
    where: {
      id: req.params.id,
      belongsToId: req.body.user.id,
    },
  });

  res.json({ data: product });
};

//Create a product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.body.user.id,
      },
    });

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

//Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.body.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: product });
};

//Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.body.user.id,
      },
    },
  });

  res.json({ data: product });
};
