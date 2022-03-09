import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { TOKEN_SECRET } = process.env;
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET as string);

    next();
  } catch (_error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};
