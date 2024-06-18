import { defineConfig } from 'drizzle-kit';
import { DB_URL } from './config';

export default defineConfig({
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: DB_URL as string
  },
  verbose: true,
  strict: true
});

