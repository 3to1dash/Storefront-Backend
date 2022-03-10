import request from 'supertest';
import { resetTables } from '../helpers/dbHelpers';

const product = {
  name: 'tea',
  price: 5,
  category: 'drink'
};

const user = {
  firstname: 'foo',
  lastname: 'bar',
  password: 'password'
};

const order = {
  quantity: 5,
  user_id: 1,
  product_id: 1,
  status: 'active'
};

describe('Orders Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    await request('http://localhost:3000').post('/users').send(user);

    const response = await request('http://localhost:3000')
      .post('/auth')
      .send({ username: user.firstname, password: user.password });
    token = response.body;

    await request('http://localhost:3000')
      .post('/products')
      .auth(token, { type: 'bearer' })
      .send(product);
  });

  afterAll(async () => {
    await resetTables();
  });

  describe('POST Endpoints', () => {
    it('POST /orders should save order with valid token and return 201 status code', async () => {
      await request('http://localhost:3000')
        .post('/orders')
        .auth(token, { type: 'bearer' })
        .send(order)
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it('POST /orders should not save order with valid token and return 401 status code', async () => {
      await request('http://localhost:3000')
        .post('/orders')
        .send(order)
        .expect(401);
    });
  });

  describe('GET Endpoints', () => {
    it('GET /orders/user/:user_id should return 200 status code with valid token', async () => {
      const user_id = order.user_id;
      await request('http://localhost:3000')
        .get(`/orders/user/${user_id}`)
        .auth(token, { type: 'bearer' })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    it('GET /orders/user/:user_id should return 401 status code without token', async () => {
      const user_id = order.user_id;
      await request('http://localhost:3000')
        .get(`/orders/user/${user_id}`)
        .expect(401);
    });

    it('GET /orders/:status/user/:user_id should return 200 status code with valid token', async () => {
      const user_id = order.user_id;
      const status = order.status;

      await request('http://localhost:3000')
        .get(`/orders/${status}/user/${user_id}`)
        .auth(token, { type: 'bearer' })
        .expect('Content-Type', /json/)
        .expect(200);
    });
    it('GET /orders/:status/user/:user_id should return 401 status code without token', async () => {
      const user_id = order.user_id;
      const status = order.status;

      await request('http://localhost:3000')
        .get(`/orders/${status}/user/${user_id}`)
        .expect(401);
    });
  });
});
