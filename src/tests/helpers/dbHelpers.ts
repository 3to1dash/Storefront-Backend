import client from '../../database';

export const resetTables = async (): Promise<void> => {
  try {
    const conn = await client.connect();
    const sql = 'TRUNCATE TABLE orders, users, products RESTART IDENTITY';

    await conn.query(sql);

    conn.release();
  } catch (error) {
    throw new Error(`Could not reset tables: ${error}`);
  }
};
