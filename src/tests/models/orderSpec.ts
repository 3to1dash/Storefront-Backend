import { Order, OrderStore, Status } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { resetTables } from '../helpers/dbHelpers';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Order Model', () => {
  it('should have an ordersByUser method', () => {
    expect(orderStore.ordersByUser).toBeDefined();
  });
  it('should have an ordersByUserAndStatus method', () => {
    expect(orderStore.ordersByUserAndStatus).toBeDefined();
  });
  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });
  it('should have an addProduct method', () => {
    expect(orderStore.addProduct).toBeDefined();
  });
  it('should have an IsOrderActive method', () => {
    expect(orderStore.IsOrderActive).toBeDefined();
  });

  describe('Data access methods should interact properly with the database', () => {
    let order: Order;
    let user: User;
    let product: Product;

    beforeAll(async () => {
      user = (await userStore.create(
        {
          firstname: 'Zoo',
          lastname: 'Bar'
        },
        'password'
      )) as User;

      product = (await productStore.create({
        name: 'tea',
        price: 4,
        category: 'drink'
      })) as Product;

      order = {
        user_id: user.id ? user.id : 1,
        status: Status.Active
      };
    });

    afterAll(async () => {
      await resetTables();
    });

    it('create method should add an order', async () => {
      const result = await orderStore.create(order);

      expect(result).toEqual({ id: 1, ...order });
    });

    it('IsOrderActive method should return an order if it is active', async () => {
      const result = await orderStore.IsOrderActive(1);

      expect(result).toEqual({ id: 1, ...order });
    });

    it('addProduct method should add an order product and return the order', async () => {
      const product_id = product.id ? product.id : 1;
      const result = await orderStore.addProduct(4, 1, product_id);

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
