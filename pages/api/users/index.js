// proteggo rotta con get unstable session
import { connection } from "../../../lib/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// middleware
import nextConnect from "next-connect";

const handler = nextConnect();
