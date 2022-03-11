import express, { Request, Response } from 'express';
import { Order, OrderStore, Status } from '../models/order';
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
      user_id: req.body.user_id,
      status: req.body.status === 'completed' ? Status.Completed : Status.Active
    };

    const newOrder = await store.create(order);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderProduct = {
      quantity: req.body.quantity,
      order_id: req.body.order_id,
      product_id: req.body.product_id
    };

    const newOrderProduct = await store.addProduct(
      orderProduct.quantity,
      orderProduct.order_id,
      orderProduct.product_id
    );
    res.status(201).json(newOrderProduct);
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
      req.body.status === 'completed' ? Status.Completed : Status.Active
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json(error);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders/users/:user_id', verifyAuthToken, ordersByUser);
  app.post('/orders', verifyAuthToken, create);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
  app.get(
    '/orders/:status/users/:user_id',
    verifyAuthToken,
    ordersByUserAndStatus
  );
};

export default orderRoutes;
