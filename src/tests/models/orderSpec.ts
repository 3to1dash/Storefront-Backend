import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { resetTables } from '../helpers/dbHelpers';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Order Model', () => {
  it('should have a ordersByUser method', () => {
    expect(orderStore.ordersByUser).toBeDefined();
  });
  it('should have a ordersByUserAndStatus method', () => {
    expect(orderStore.ordersByUserAndStatus).toBeDefined();
  });
  it('should have an create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  describe('Data access methods should interact properly with the database', () => {
    let order: Order;
    let user: User;
    let product: Product;

    beforeAll(async () => {
      user = (await userStore.create({
        firstname: 'Zoo',
        lastname: 'Bar',
        password: 'password'
      })) as User;

      product = (await productStore.create({
        name: 'tea',
        price: 4,
        category: 'drink'
      })) as Product;

      order = {
        quantity: 5,
        user_id: user.id ? user.id : 1,
        product_id: product.id ? product.id : 1,
        status: 'active'
      };
    });

    afterAll(async () => {
      await resetTables();
    });

    it('create method should add an order', async () => {
      const result = await orderStore.create(order);

      expect(result).toEqual({ id: 1, ...order });
    });

    it('ordersByUser method should return a list of orders by user', async () => {
      const user_id = user.id ? user.id.toString() : '1';
      const result = await orderStore.ordersByUser(user_id);

      expect(result).toEqual([{ id: 1, ...order }]);
    });

    it('ordersByUserAndStatus method should return a list of orders by user and status', async () => {
      const user_id = user.id ? user.id.toString() : '1';
      const result = await orderStore.ordersByUserAndStatus(
        user_id,
        order.status
      );

      expect(result).toEqual([{ id: 1, ...order }]);
    });
  });
});
