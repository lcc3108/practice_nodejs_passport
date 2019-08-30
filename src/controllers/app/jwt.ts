import jwt from "jsonwebtoken";
import { client } from "../redis";

const EXPIRE_TIME = 20 * 60;

interface ITokenBody {
  id: string;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}

export const generateToken = async (id: string = "") => {
  const token = jwt.sign({ id }, process.env.jwtsecret, {
    expiresIn: `${EXPIRE_TIME}s`,
    issuer: "lcc3108.com",
    subject: "userInfo",
  });

  if (id) {
    const tokenBody: ITokenBody = jwt.verify(token, process.env.jwtsecret) as ITokenBody;
    if (typeof tokenBody !== "string" && tokenBody) {
      await client.set(`jwt:${id}`, tokenBody.iat.toString(), "EX", EXPIRE_TIME);
    }
  }

  return token;
};

export const isValidToken = async (user): Promise<Boolean> => {
  const token = await client.get(`jwt:${user.id}`);
  return +token === user.iat;
};
