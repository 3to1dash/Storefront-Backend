import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import authRoutes from './handlers/auth';

export const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);
authRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
