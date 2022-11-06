// proteggo rotta con token
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req }, process.nextTick.APP_JWT_SECRET);
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    res.status(401).message("Unhautorized!");
  }
  // const { email } = req.body;
}
