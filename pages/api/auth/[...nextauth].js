// NEXT AUTH
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// LIBS
import { comparePassword } from "../../../lib/auth/bcrypt-util";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.APP_JWT_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // logica personale

        // connect to mongo per verifica email e password inserite
        const client = await connectToDatabase();

        const db = client.db();

        // trovo utente se esiste
        const findUserByEmail = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!findUserByEmail) {
          client.close();
          throw new Error("User not found with this email!");
        }

        // verifica password
        const isValidPass = await comparePassword(
          credentials.password,
          findUserByEmail.password
        );

        if (!isValidPass) {
          client.close();
          throw new Error("Invalid password!");
        }

        const userInfos = {
          ...findUserByEmail,
        };

        delete userInfos.password;

        // return di obj indica a next auth verificacompleta
        client.close();
        return { ...userInfos };
      },
    }),
  ],
});
