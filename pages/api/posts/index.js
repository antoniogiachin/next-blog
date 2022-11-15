// proteggo rotta con token
import { connectToDatabase } from "../../../lib/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
//multer
import multer from "multer";

// rimozione body parser to JSON per ricevere stream file
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  let client;
  let db;

  try {
    client = await connectToDatabase();
    db = client.db();
  } catch (err) {
    client.close();
    res
      .status(500)
      .json({ success: false, message: "Failed to connect to DB!" });
    return;
  }

  if (req.method === "GET") {
    const query = req.query;

    let posts;
    try {
      posts = await db.collection("posts").find(query).toArray();
    } catch (err) {
      client.close();
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch all posts!" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "All posts Fetch!",
      posts,
    });
  }

  // DA IMPLEMENTARE
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      client.close();
      res.status(401).json({ success: false, message: "Unhautorized!" });
      return;
    }

    const { title, content } = req.body;
    const file = req.file;

    if ((!title, !content)) {
      res.status(422).json({ success: false, message: "All Fields Required!" });
      return;
    }

    const reviewToInsert = {
      title,
      content,
      vote: 0,
      reactions: { thumbUp: 0, thumbsDown: 0, heart: 0 },
    };

    let createReview;
    try {
      createReview = await db.collection("reviews").insertOne(reviewToInsert);
    } catch (err) {
      client.close();
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
      client.close();
      res
        .status(500)
        .json({ success: false, message: "Failed to create new review!" });
      return;
    }

    client.close();

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
      client.close();
      res
        .status(500)
        .json({ success: false, message: "Error Updating Review" });
      return;
    }

    client.close();
    res.status(200).json({
      success: true,
      message: "Review Successfully Updated!",
      review: reviewToUpdate,
    });
  }

  if (req.method === "DELETE") {
  }
}
