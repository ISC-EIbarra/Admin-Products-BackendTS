import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {
  //Validation

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const product = await Product.create(req.body);

  res.json({ data: product });
};
