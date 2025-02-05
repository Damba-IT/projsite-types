import { Db } from 'mongodb';

// MongoDB Hono Environment Type
export interface MongoHonoEnv {
  Bindings: {
    MONGODB_URI: string;
    CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
  };
  Variables: {
    db: Db;
  };
}

// Add other API-specific types here as needed 