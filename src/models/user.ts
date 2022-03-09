import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({
  path: 'dev'
});

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
};

export class UserStore {
  async index(): Promise<User[] | null> {
    try {
      const conn = await client.connect();
      const sql = 'Select id, firstname, lastname From users';

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
      const sql = 'Select id, firstname, lastname From users Where id=($1)';

      const result = await conn.query<User>(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get user. Error: ${error}`);
    }
  }

  async create(user: User, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = `Insert Into users (firstname, lastname, password_digest) 
        Values ($1, $2, $3) Returning id, firstname, lastname`;

      const { BCRYPT_SECRET, SALT_ROUNDS } = process.env;
      const hash = bcrypt.hashSync(
        password + BCRYPT_SECRET,
        parseInt(SALT_ROUNDS || '10')
      );

      const result = await conn.query<User>(sql, [
        user.firstname,
        user.lastname,
        hash
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not save user. Error: ${error}`);
    }
  }

  static async authenticate(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'Select * from users where firstname = ($1)';

      const result = await conn.query(sql, [username]);

      const { BCRYPT_SECRET } = process.env;

      if (result.rows.length) {
        const user = result.rows[0];

        if (
          bcrypt.compareSync(password + BCRYPT_SECRET, user.password_digest)
        ) {
          const authenticatedUser: User = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname
          };
          return authenticatedUser;
        }
      }
    } catch (error) {
      throw new Error(`Could not authenticate user: ${error}`);
    }

    return null;
  }
}
