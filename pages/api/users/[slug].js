// proteggo rotta con get unstable session
import { connection } from "../../../lib/db";
// route gestione
import nextConnect from "next-connect";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db, client } = await connection();

  const { query } = req;
  const slug = query.slug;

  const agg = [
    {
      $lookup: {
        from: "posts",
        localField: "ObjectId",
        foreignField: "ObjectId",
        as: "posts",
      },
    },
    {
      $match: {
        slug: slug,
      },
    },
    {
      $unset: "password",
    },
  ];

  let usersRes;
  try {
    const collection = db.collection("users");
    const cursor = collection.aggregate(agg);
    usersRes = await cursor.toArray();
    console.log(usersRes);
  } catch (err) {
    await client.close();
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all posts!" });
    return;
  }

  await client.close();

  res.status(200).json({
    success: true,
    message: "All posts Fetch!",
    usersRes,
  });
});

export default handler;
