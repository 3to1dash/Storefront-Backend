import client from '../database';

export type Order = {
  id?: number;
  quantity: number;
  user_id: number;
  product_id: number;
  status: string;
};

export class OrderStore {
  async ordersByUser(id: string): Promise<Order[] | null> {
    try {
      const conn = await client.connect();
      const sql = 'Select * From orders Where user_id = ($1)';

      const result = await conn.query<Order>(sql, [id]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`);
    }
  }

  async create(order: Order): Promise<Order | null> {
    try {
      const conn = await client.connect();
      const sql =
        'Insert Into orders (quantity, user_id, product_id, status) Values ($1, $2, $3, $4) Returning *';

      const result = await conn.query<Order>(sql, [
        order.quantity,
        order.user_id,
        order.product_id,
        order.status
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`);
    }
  }

  async ordersByUserAndStatus(
    id: string,
    status: string
  ): Promise<Order[] | null> {
    try {
      const conn = await client.connect();
      const sql = 'Select * From orders Where user_id = ($1) And status = ($2)';

      const result = await conn.query<Order>(sql, [id, status]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`);
    }
  }
}
