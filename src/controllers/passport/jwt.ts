import { Strategy, ExtractJwt } from "passport-jwt";
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
  const token = jwt.sign({ id,auth : true }, process.env.jwtsecret, {
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

// https://www.npmjs.com/package/passport-jwt#extracting-the-jwt-from-the-request
const emptyExtractor = function(req) {
  return generateToken();
};

const param = {
  secretOrKey: process.env.jwtsecret,
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), emptyExtractor]),
  // passReqToCallback: true
};

// console.log(process.env.jwtsecret);
export const jwtStrategy = new Strategy(param, async (payload: ITokenBody, done) => {
  if (payload.id) {
    const token = await getKey(`jwt:${payload.id}`);
    if (+token === payload.iat) {
      const user = await getUser(payload.id);
      return done(null, { ...user, auth: true });
    }
  }
  return done(null, { auth: false })
});
