Create Table IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(64),
  lastname VARCHAR(64),
  password VARCHAR(255)
);