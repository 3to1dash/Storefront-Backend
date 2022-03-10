import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserStore } from '../models/user';
import dotenv from 'dotenv';

dotenv.config({
  path: 'env'
});

const auth = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserStore.authenticate(
      req.body.username,
      req.body.password
    );
    if (!user) throw new Error('Could not authenticate user');

    const { TOKEN_SECRET } = process.env;

    const token = jwt.sign({ user: user }, TOKEN_SECRET as string);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json(error);
  }
};

const authRoutes = (app: express.Application) => {
  app.post('/auth', auth);
};

export default authRoutes;
