import { Pool } from 'pg';
import dotenv from 'dotenv';

const dotenvFile = process.env.ENV === 'dev' ? '.env' : '.env.test';

dotenv.config({
  path: dotenvFile
});

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT || ''),
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
});

export default client;
