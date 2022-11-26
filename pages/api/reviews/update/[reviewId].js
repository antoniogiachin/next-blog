import { connection } from "../../../../lib/db";

// route handler
import nextConnect from "next-connect";

import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.put(async (req, res) => {
  const reviewId = req.query.reviewId;
  const { thumbUp, thumbsDown, heart } = req.body;

  const { db, client } = await connection();

  let reviewToUpdate;
  try {
    reviewToUpdate = await db
      .collection("reviews")
      .updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { reactions: { thumbUp, thumbsDown, heart } } }
      );
  } catch (err) {
    await client.close();
    res.status(500).json({ success: false, message: "Error Updating Review" });
    return;
  }

  await client.close();
  res.status(200).json({
    success: true,
    message: "Review Successfully Updated!",
    review: reviewToUpdate,
  });
});

export default handler;
