import mongoose from 'mongoose';

// Add a type-safe global declaration for mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof import('mongoose') | null | undefined;
    promise: Promise<typeof import('mongoose')> | null | undefined;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
cached = global.mongoose as unknown as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
} 