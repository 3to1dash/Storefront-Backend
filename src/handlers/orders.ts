import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { verifyAuthToken } from '../middlewares/authorization';

const store = new OrderStore();

const ordersByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.ordersByUser(req.params.user_id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      status: 'active'
    };
    const newOrder = await store.create(order);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(404).json(error);
  }
};

const ordersByUserAndStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await store.ordersByUserAndStatus(
      req.params.user_id,
      req.params.status
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json(error);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders/user/:user_id', verifyAuthToken, ordersByUser);
  app.post('/orders', verifyAuthToken, create);
  app.get(
    '/orders/:status/user/:user_id',
    verifyAuthToken,
    ordersByUserAndStatus
  );
};

export default orderRoutes;
