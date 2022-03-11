import client from '../database';

export enum Status {
  Active = 'active',
  Completed = 'completed'
}

export type Order = {
  id?: number;
  user_id: number;
  status: Status;
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
        'Insert Into orders (user_id, status) Values ($1, $2) Returning *';

      const result = await conn.query<Order>(sql, [
        order.user_id,
        order.status || Status.Active
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<Order> {
    try {
      const order = await this.IsOrderActive(order_id);
      const conn = await client.connect();
      const sql =
        'Insert Into order_products (quantity, order_id, product_id) Values($1, $2, $3) Returning *';

      await conn.query(sql, [quantity, order_id, product_id]);
      conn.release();

      return order;
    } catch (error) {
      throw new Error(
        `Could not add product ${product_id} to order ${order_id}: ${error}`
      );
    }
  }

  async IsOrderActive(order_id: number): Promise<Order> {
    try {
      const ordersql = 'Select * From orders Where id = ($1)';
      const conn = await client.connect();

      const result = await conn.query<Order>(ordersql, [order_id]);

      const order = result.rows[0];

      if (order.status !== Status.Active) {
        throw new Error(`Order status is ${order.status}`);
      }

      conn.release();

      return order;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async ordersByUserAndStatus(
    id: string,
    status: Status
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
