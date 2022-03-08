import client from '../database';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[] | null> {
    try {
      const conn = await client.connect();
      const sql = 'Select * From users';

      const result = await conn.query<User>(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`);
    }
  }

  async show(id: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'Select * From users Where id=($1)';

      const result = await conn.query<User>(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get user. Error: ${error}`);
    }
  }

  async create(user: User): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = `Insert Into users (firstname, lastname, password) 
        Values ($1, $2, $3) RETURNING *`;

      const result = await conn.query<User>(sql, [
        user.firstname,
        user.lastname,
        user.password
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not save user. Error: ${error}`);
    }
  }
}
