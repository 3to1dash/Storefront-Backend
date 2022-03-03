import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  describe('Data access methods should interact properly with the database', () => {
    let user: User;

    beforeAll(() => {
      user = {
        firstname: 'Mahmoud',
        lastname: 'Ahmed',
        password: 'password123'
      };
    });

    it('create method should add a user', async () => {
      const result = await store.create(user);

      expect(result).toEqual({ id: 1, ...user });
    });

    it('index method should return a list of users', async () => {
      const result = await store.index();

      expect(result).toEqual([{ id: 1, ...user }]);
    });

    it('show method should return a user given its id', async () => {
      const result = await store.show('1');

      expect(result).toEqual({ id: 1, ...user });
    });
  });
});
