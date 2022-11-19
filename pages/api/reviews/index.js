// proteggo rotta con get unstable session
import { connection } from "../../../lib/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// route handler
import nextConnect from "next-connect";

import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db, client } = await connection();

  let reviews;
  try {
    reviews = await db.collection("reviews").find().toArray();
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

handler.post(async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    thumbDeleter(thumbnail);
    await client.close();
    res.status(401).json({ success: false, message: "Unhautorized!" });
    return;
  }

  const { db, client } = await connection();

  const { title, vote, content, postId } = req.body;

  if (!title || !content || !postId) {
    res.status(422).json({ success: false, message: "All Fields Required!" });
    return;
  }

  const reviewToInsert = {
    title,
    content,
    vote,
    postId,
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
        { _id: ObjectId(postId) },
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
});

handler.put(async (req, res) => {
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
