import assert from 'assert';
import request from 'supertest';

describe('GET /', () => {
  it('should return 200 status code with a massage', (done) => {
    request('http://localhost:3000')
      .get('/')
      .expect(200)
      .then((response) => {
        assert(response.body, 'Hello World!');
        done();
      });
  });
});
