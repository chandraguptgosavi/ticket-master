import { Pool } from "pg";
import { PostgresDialect } from "kysely";

const pool = new Pool({
  database: process.env.EVENT_CRUD_SERVICE_POSTGRES_DB_NAME,
  host: process.env.POSTGRES_DB_HOST,
  user: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: +process.env.POSTGRES_DB_PORT!,
  max: 10,
});

export const dialect = new PostgresDialect({
  pool: pool,
});
