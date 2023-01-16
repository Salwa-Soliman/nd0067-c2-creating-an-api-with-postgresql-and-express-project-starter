import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const {
  POSTGRES_HOST: host,
  POSTGRES_DB: database,
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
} = process.env;

const client = new Pool({
  host,
  database,
  user,
  password,
});

export default client;
