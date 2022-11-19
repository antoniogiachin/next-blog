import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const uri = process.env.APP_MONGO_URI;
  const client = await MongoClient.connect(uri);

  return client;
};

export const connection = async () => {
  let client;
  let db;

  try {
    client = await connectToDatabase();
    db = client.db();
  } catch (err) {
    await client.close();
    res
      .status(500)
      .json({ success: false, message: "Failed to connect to DB!" });
    return;
  }

  return { db, client };
};
