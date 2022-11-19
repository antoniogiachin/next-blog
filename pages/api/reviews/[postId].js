// proteggo rotta con get unstable session
import { connection } from "../../../lib/db";
// route handler
import nextConnect from "next-connect";

import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db, client } = await connection();

  const { query } = req;

  let reviews;
  try {
    reviews = await db.collection("reviews").find(query).toArray();
  } catch (err) {
    await client.close();
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all reviews!" });
    return;
  }

  await client.close();

  res.status(200).json({
    success: true,
    message: "All reviews Fetched!",
    reviews,
  });
});

export default handler;
