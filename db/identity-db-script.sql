SET TIME ZONE 'Asia/Calcutta';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
      FROM pg_type
     WHERE typname = 'user_role'
  ) THEN
    CREATE TYPE user_role AS ENUM ('normal', 'admin');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        user_role NOT NULL DEFAULT 'normal',
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP
);
