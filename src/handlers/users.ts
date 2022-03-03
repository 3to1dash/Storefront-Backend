import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };

  try {
    const newUser = await store.create(user);
    res.json(newUser);
  } catch (error) {
    res.status(404);
    res.json(error);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
};

export default userRoutes;
