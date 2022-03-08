import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[] | null> {
    try {
      const conn = await client.connect();
      const sql = 'Select * From products';

      const result = await conn.query<Product>(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could not get products. Error: ${error}`);
    }
  }

  async show(id: string): Promise<Product | null> {
    try {
      const conn = await client.connect();
      const sql = 'Select * From products Where id=($1)';

      const result = await conn.query<Product>(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get products. Error: ${error}`);
    }
  }

  async create(product: Product): Promise<Product | null> {
    try {
      const conn = await client.connect();
      const sql =
        'Insert Into products (name, price, category) Values ($1, $2, $3) Returning *';

      const result = await conn.query<Product>(sql, [
        product.name,
        product.price,
        product.category
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not save product. Error: ${error}`);
    }
  }
}
