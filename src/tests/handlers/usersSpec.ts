import request from 'supertest';
import { resetTables } from '../helpers/dbHelpers';

const user = {
  firstname: 'foo',
  lastname: 'bar',
  password: 'password'
};

describe('Users Endpoints', () => {
  let token: string;

  afterAll(async () => {
    await resetTables();
  });

  describe('POST /users', () => {
    it('should save a user and return 201 status code', async () => {
      await request('http://localhost:3000')
        .post('/users')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201);
    });
  });

  describe('GET Endpoints', () => {
    beforeAll(async () => {
      const response = await request('http://localhost:3000')
        .post('/auth')
        .send({ username: user.firstname, password: user.password });
      token = response.body;
    });

    describe('GET /users', () => {
      it('should retrieve a list of users and return 200 status code', async () => {
        await request('http://localhost:3000')
          .get('/users')
          .auth(token, { type: 'bearer' })
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });

    describe('GET /users/:id', () => {
      it('should retrieve a users given its id and return 200 status code', async () => {
        const user_id = 1;
        await request('http://localhost:3000')
          .get(`/users/${user_id}`)
          .auth(token, { type: 'bearer' })
          .expect('Content-Type', /json/)
          .expect(200);
      });

      it('should return 401 status code when sent without auth token', async () => {
        const user_id = 1;
        await request('http://localhost:3000')
          .get(`/users/${user_id}`)
          .expect(401);
      });
    });
  });
});
