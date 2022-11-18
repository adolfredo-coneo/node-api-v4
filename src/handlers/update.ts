import { Request, Response } from 'express';
import prisma from '../modules/db';

//Get updates from a product
export const getUpdatesByProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        updates: true,
      },
    });

    res.json({ data: product.updates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get all products updates by user
export const getUpdatesByUser = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        belongsToId: req.body.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = product.map((product) => product.updates);
    res.json({ data: updates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get an update
export const getUpdate = async (req: Request, res: Response) => {
  try {
    const update = await prisma.update.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create an update
export const createUpdate = async (req: Request, res: Response) => {
  try {
    const update = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        version: req.body.version,
        assetUrl: req.body.assetUrl,
        product: {
          connect: {
            id: req.params.id,
          },
        },
      },
    });

    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update an update
export const updateUpdate = async (req: Request, res: Response) => {
  try {
    const update = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        version: req.body.version,
        assetUrl: req.body.assetUrl,
      },
    });

    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete an update
export const deleteUpdate = async (req: Request, res: Response) => {
  try {
    const update = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
