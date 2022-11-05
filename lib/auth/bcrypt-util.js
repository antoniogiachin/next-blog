import { hash, compare } from "bcryptjs";

export const hashPassword = async (pwd) => {
  return await hash(pwd, 12);
};

export const comparePassword = async (pwd, hashedPwd) => {
  return await compare(pwd, hashedPwd);
};
