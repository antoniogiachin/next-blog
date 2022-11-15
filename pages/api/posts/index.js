import path from "path";
import fs from "fs";
import multer from "multer";
// proteggo rotta con token
import { connectToDatabase } from "../../../lib/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// middleware
import nextConnect from "next-connect";

const handler = nextConnect();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const name = file.originalname.split(".")[0];
    let postThumbnailImageDir = `posts/${name.trim().replaceAll(" ", "")}`;
    let postThumbnailImagePath = path.join(
      process.cwd(),
      "public",
      "images",
      postThumbnailImageDir
    );
    if (!fs.existsSync(postThumbnailImagePath)) {
      fs.mkdirSync(postThumbnailImagePath);
    }
    cb(null, postThumbnailImagePath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      (new Date().toISOString() + file.originalname).replaceAll(" ", "")
    );
  },
});

// profile pictures type filter
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const connection = async () => {
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

  return db;
};

handler.get(async (req, res) => {
  const db = await connection();

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
});

handler.post(upload.any(), async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    client.close();
    res.status(401).json({ success: false, message: "Unhautorized!" });
    return;
  }

  console.log(req);
});

// rimozione body parser to JSON per ricevere stream file
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
