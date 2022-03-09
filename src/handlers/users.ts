import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import dotenv from 'dotenv';
import { verifyAuthToken } from '../middlewares/authorization';

dotenv.config({
  path: 'env'
});

const store = new UserStore();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await store.show(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };

  const { TOKEN_SECRET } = process.env;

  try {
    const newUser = await store.create(user, req.body.password);
    const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
};

export default userRoutes;
