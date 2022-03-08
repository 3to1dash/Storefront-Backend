import { Product, ProductStore } from '../../models/product';
import { resetTables } from '../helpers/dbHelpers';

const productStore = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(productStore.index).toBeDefined();
  });
  it('should have an show method', () => {
    expect(productStore.show).toBeDefined();
  });
  it('should have an create method', () => {
    expect(productStore.create).toBeDefined();
  });

  describe('Data access methods should interact properly with the database', () => {
    let product: Product;

    beforeAll(() => {
      product = {
        name: 'coffee',
        price: 5,
        category: 'drink'
      };
    });

    afterAll(async () => {
      await resetTables();
    });

    it('create method should add a product', async () => {
      const result = await productStore.create(product);

      expect(result).toEqual({ id: 1, ...product });
    });

    it('index method should return a list of products', async () => {
      const result = await productStore.index();

      expect(result).toEqual([{ id: 1, ...product }]);
    });

    it('show method should return a product given its id', async () => {
      const result = await productStore.show('1');

      expect(result).toEqual({ id: 1, ...product });
    });
  });
});
