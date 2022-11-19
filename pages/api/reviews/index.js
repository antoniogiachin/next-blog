// proteggo rotta con token
import { getToken } from "next-auth/jwt";
import { connection } from "../../../lib/db";

export default async function handler(req, res) {
  const { db, client } = await connection();

  if (req.method === "POST") {
    const token = await getToken({ req }, process.nextTick.APP_JWT_SECRET);

    if (!token) {
      await client.close();
      res.status(401).json({ success: false, message: "Unhautorized!" });
      return;
    }

    const { title, vote, content, postId } = req.body;

    if ((!title, !content, !postId)) {
      res.status(422).json({ success: false, message: "All Fields Required!" });
      return;
    }

    const reviewToInsert = {
      title,
      content,
      vote,
      reactions: { thumbUp: 0, thumbsDown: 0, heart: 0 },
    };

    let createReview;
    try {
      createReview = await db.collection("reviews").insertOne(reviewToInsert);
    } catch (err) {
      await client.close();
      res
        .status(500)
        .json({ success: false, message: "Failed to create new review!" });
      return;
    }

    try {
      await db
        .collection("posts")
        .updateOne(
          { _id: postId },
          { $push: { reviews: createReview.insertedId } }
        );
    } catch (err) {
      await client.close();
      res
        .status(500)
        .json({ success: false, message: "Failed to create new review!" });
      return;
    }

    await client.close();

    res.status(201).json({
      success: true,
      message: "Review Successfully Inserted!",
      review: createReview,
    });
  }

  if (req.method === "PUT") {
    const reviewId = req.params.id;
    const { thumbUp, thumbsDown, heart } = req.body;

    let reviewToUpdate;
    try {
      reviewToUpdate = await db
        .collection("reviews")
        .updateOne(
          { _id: reviewId },
          { $set: { reactions: { thumbUp, thumbsDown, heart } } }
        );
    } catch (err) {
      await client.close();
      res
        .status(500)
        .json({ success: false, message: "Error Updating Review" });
      return;
    }

    await client.close();
    res.status(200).json({
      success: true,
      message: "Review Successfully Updated!",
      review: reviewToUpdate,
    });
  }
}
