import { getUser } from "@/controllers/user";
import jwt from "jsonwebtoken";
import { getKey, setKey } from "../redis";

const EXPIRE_TIME = 20 * 60;

interface ITokenBody {
  id: string;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}

export const generateToken = (id: string = "") => {
  const token = jwt.sign({ id }, process.env.jwtsecret, {
    expiresIn: `${EXPIRE_TIME}s`,
    issuer: "lcc3108.com",
    subject: "userInfo",
  });

  if (id) {
    const tokenBody: ITokenBody = jwt.verify(token, process.env.jwtsecret) as ITokenBody;
    if (typeof tokenBody !== "string" && tokenBody) {
      setKey(`jwt:${id}`, tokenBody.iat.toString(), "EX", EXPIRE_TIME);
    }
  }

  return token;
};

export const isValidToken = async (user) :Promise<Boolean> => { 
    const token = await getKey(`jwt:${user.id}`);
    return (+token === user.iat);
}