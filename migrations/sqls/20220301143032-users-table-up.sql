Create Table IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(64) NOT NULL,
  lastname VARCHAR(64) NOT NULL,
  password_digest VARCHAR NOT NULL
);
