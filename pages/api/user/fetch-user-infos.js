// proteggo rotta con get unstable session
import { connection } from "../../../lib/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// middleware
import nextConnect from "next-connect";

const handler = nextConnect();

handler.get(async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    thumbDeleter(thumbnail);
    await client.close();
    res.status(401).json({ success: false, message: "Unhautorized!" });
    return;
  }

  const { db, client } = await connection();

  const { user } = session;
  console.log(user);
  const email = user.email;

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
        email: email,
      },
    },
  ];

  let userRes;
  try {
    const collection = db.collection("users");
    const cursor = collection.aggregate(agg);
    userRes = await cursor.toArray();
  } catch (err) {
    await client.close();
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch user infos!" });
  }

  await client.close();
  delete userRes.password;

  res.status(200).json({
    success: true,
    message: "All infos fetched!",
    user: userRes,
  });
});

export default handler;
