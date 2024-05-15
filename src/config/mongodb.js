import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./environment";

let databaseInstance = null;

const client = new MongoClient(env.DATABASE_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectDB = async () => {
  await client.connect();
  databaseInstance = client.db(env.DATABASE_NAME);
};

export const getDB = () => {
  if (!databaseInstance) throw new Error("Must connect to Database first!");
  return databaseInstance;
};
