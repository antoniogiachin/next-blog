// NEXT AUTH
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// LIBS
import { comparePassword } from "../../../lib/auth/bcrypt-util";
import { connection } from "../../../lib/db";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.APP_JWT_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // logica personale

        const { db, client } = await connection();

        // trovo utente se esiste
        const findUserByEmail = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!findUserByEmail) {
          await client.close();
          throw new Error("User not found with this email!");
        }

        // verifica password
        const isValidPass = await comparePassword(
          credentials.password,
          findUserByEmail.password
        );

        if (!isValidPass) {
          await client.close();
          throw new Error("Invalid password!");
        }

        const userInfos = {
          ...findUserByEmail,
        };

        delete userInfos.password;

        // return di obj indica a next auth verificacompleta
        await client.close();
        return { ...userInfos };
      },
    }),
  ],
};

export default NextAuth(authOptions);
