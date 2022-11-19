import { connection } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth/bcrypt-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // REGEX EMAIL E PASSWORD
    const EMAIL_REGEX =
      /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    const PWD_REGEX = /[0-9a-zA-Z]{6,}/;

    const { name, surname, email, password, confirmPassword } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !surname ||
      surname.trim() === "" ||
      !email ||
      email.trim === "" ||
      !password ||
      password.trim() === "" ||
      (!confirmPassword && confirmPassword.trim() === "")
    ) {
      res.status(422).json({ success: false, message: "All Fields Required!" });
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      res
        .status(422)
        .json({ success: false, message: "Please Provide a valid email!" });
      return;
    }

    if (!PWD_REGEX.test(password)) {
      res.status(422).json({
        success: false,
        message: "Please Provide a valid password (min 6 char length!)!",
      });
      return;
    }

    if (password !== confirmPassword) {
      res
        .status(422)
        .json({ success: false, message: "The passwords don't match!!" });
      return;
    }

    const slug = `${name}-${surname}-${new Date()
      .toLocaleDateString("en-US")
      .replaceAll(".", "")
      .replaceAll(" ", "")}-${new Date()
      .toLocaleTimeString("en-US")
      .replaceAll(".", "")
      .replaceAll(" ", "")
      .replaceAll(":", "")}`;

    const hashedPassword = await hashPassword(password);

    const newUser = {
      name,
      surname,
      email,
      slug,
      password: hashedPassword,
    };

    const { db, client } = await connection();;

    // user exists check
    const exist = await db.collection("users").findOne({ email });

    if (exist) {
      await client.close();
      res.status(422).json({ success: false, message: "User already exist!" });
      return;
    }

    const result = await db.collection("users").insertOne(newUser);

    newUser.id = result.insertedId;

    if (!result) {
      await client.close();
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    } else {
      await client.close();
      res.status(201).json({
        success: true,
        message: `Welcome aboard ${name} ${surname}!`,
        newUser: newUser,
      });
    }
  }
}
