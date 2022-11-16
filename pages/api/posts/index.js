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

const thumbDeleter = (path) => {
  const file = path.join(process.cwd(), "public", path);
  fs.unlink(file, (err) => {
    if (err) console.log(err);
  });
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

  return { db, client };
};

handler.get(async (req, res) => {
  const { db, client } = await connection();

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
  const thumbnail =
    req.files[0].destination.split("public")[1] + "/" + req.files[0].filename;

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    thumbDeleter(thumbnail);
    client.close();
    res.status(401).json({ success: false, message: "Unhautorized!" });
    return;
  }

  const { db, client } = await connection();

  const { title, content } = req.body;
  const { user } = session;
  const recap = content.slice(0, 100);

  // max 5 post con lo stesso titolo
  let sameTitleArticles;
  try {
    sameTitleArticles = db.collection("posts").find({ title }).toArray();
  } catch (err) {
    thumbDeleter(thumbnail);
    client.close();
    res.status(500).json({
      success: false,
      message: "Error Fetching articles",
    });
    return;
  }

  if (sameTitleArticles.length > 5) {
    res.status(400).json({
      success: false,
      message:
        "Please change your title (too manun posts with the same title)!",
    });
  }

  let author;
  try {
    const findAuthorBySession = await db
      .collection("users")
      .findOne({ email: user.email });
    author = `${findAuthorBySession.name} ${findAuthorBySession.surname}`;
  } catch (err) {
    thumbDeleter(thumbnail);
    client.close();
    res.status(401).json({ success: false, message: "Unauthorized!" });
    return;
  }

  const parsedTitle = title.replaceAll(" ", "-");
  let slugToTest = `${parsedTitle}-${new Date()
    .toLocaleDateString("en-US")
    .replaceAll(".", "")
    .replaceAll("/", "")
    .replaceAll(" ", "")}-${new Date()
    .toLocaleTimeString("en-US")
    .replaceAll(".", "")
    .replaceAll("/", "")
    .replaceAll(" ", "")
    .replaceAll(":", "")}`;

  let slug = slugToTest;
  try {
    while (await db.collection("posts").findOne({ slug })) {
      slug =
        slugToTest +
        new Date()
          .toLocaleTimeString("en-US")
          .replaceAll(".", "")
          .replaceAll("/", "")
          .replaceAll(" ", "")
          .replaceAll(":", "");
    }
  } catch (err) {
    thumbDeleter(thumbnail);
    client.close();
    res.status(500).json({ success: false, message: "Erroe checking slug!" });
    return;
  }

  const postToSave = {
    slug,
    thumbnail,
    title: parsedTitle,
    recap,
    author,
    content,
    isFeatured: false,
  };

  let newPost;
  try {
    newPost = await db.collection("posts").insertOne(postToSave);
  } catch (err) {
    thumbDeleter(thumbnail);
    client.close();
    res.status(500).json({ success: false, message: "Error creating post!" });
    return;
  }

  try {
    await db
      .collection("users")
      .updateOne(
        { email: user.email },
        { $push: { posts: newPost.insertedId } }
      );
  } catch (error) {
    thumbDeleter(thumbnail);
    client.close();
    res.status(500).json({ success: false, message: "Error Updating User!" });
    return;
  }

  client.close();
  res
    .status(201)
    .json({ success: true, message: "New Post Created!", post: postToSave });
});

// rimozione body parser to JSON per ricevere stream file
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
