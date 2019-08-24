import { Strategy, ExtractJwt } from "passport-jwt";
import { getUser } from "../user";
import jwt from "jsonwebtoken";

export const generateToken = (id: string = "") => {
  return jwt.sign({ id, auth: id ? true : false }, process.env.jwtsecret, {
    expiresIn: "20m",
    issuer: "lcc3108.com",
    subject: "userInfo",
  });
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
export const jwtStrategy = new Strategy(param, async (payload, done) => {
  if (payload.auth) {
    const user = await getUser(payload.id);
    return done(null, { ...user, auth: true });
  }
  return done(null, payload);
});
