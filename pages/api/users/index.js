// proteggo rotta con get unstable session
import { connection } from "../../../lib/db";
// route gestione
import nextConnect from "next-connect";

const handler = nextConnect();

handler.get(async (req, res) => {
  const { db, client } = await connection();

  let users;
  try {
    users = await db
      .collection("users")
      .find()
      .project({ name: 1, surname: 1, posts: 1, email: 1 })
      .toArray();
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
    users,
  });
});

export default handler;
