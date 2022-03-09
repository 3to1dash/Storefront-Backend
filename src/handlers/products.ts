import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthToken } from '../middlewares/authorization';

const store = new ProductStore();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.show(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };

  try {
    const newProduct = await store.create(product);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// const topProducts = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const products = await store.topProducts(req.params.limit || '5');
//     res.json(products);
//   } catch (error) {
//     res.status(404);
//     res.json(error);
//   }
// };

// const ProductsByCategory = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const products = await store.productsByCategory(req.params.category);
//     res.json(products);
//   } catch (error) {
//     res.status(404);
//     res.json(error);
//   }
// };

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  // app.get('/products/top/:limit', topProducts);
  // app.get('/products/:category', ProductsByCategory);
};

export default productRoutes;
