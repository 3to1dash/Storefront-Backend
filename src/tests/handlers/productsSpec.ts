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

describe('Product Endpoints', () => {
  let token: string;

  afterAll(async () => {
    await resetTables();
  });

  describe('POST Endpoints', () => {
    beforeAll(async () => {
      await request('http://localhost:3000').post('/users').send(user);

      const response = await request('http://localhost:3000')
        .post('/auth')
        .send({ username: user.firstname, password: user.password });
      token = response.body;
    });

    it('should save a product with valid token and return 201 status code', async () => {
      await request('http://localhost:3000')
        .post('/products')
        .auth(token, { type: 'bearer' })
        .send({
          name: product.name,
          price: product.price,
          category: product.category
        })
        .expect('Content-Type', /json/)
        .expect(201);
    });
    it('should not save a product without token and return 401 status code', async () => {
      await request('http://localhost:3000')
        .post('/products')
        .send({
          name: product.name,
          price: product.price,
          category: product.category
        })
        .expect(401);
    });
  });

  describe('GET Endpoints', () => {
    it('GET /products should return 200 status code', async () => {
      await request('http://localhost:3000')
        .get('/products')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('GET /products/:id should return 200 status code', async () => {
      await request('http://localhost:3000')
        .get(`/products/${1}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
