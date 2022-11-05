import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const uri = process.env.APP_MONGO_URI;
  const client = await MongoClient.connect(uri);

  return client;
};
