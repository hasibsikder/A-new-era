import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 2000,
      idleTimeoutMillis: 5000,
      max: 5
    });
    db = drizzle({ client: pool, schema });
    console.log('Database connection ready');
  } catch (error) {
    console.warn('Database connection failed:', error);
  }
} else {
  console.warn('DATABASE_URL not set, using in-memory storage');
}

export { pool, db };
