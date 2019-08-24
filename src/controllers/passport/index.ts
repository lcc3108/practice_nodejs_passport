import passport from "passport";
import { jwtStrategy } from "./jwt";
import { localStrategy } from "./local";

passport.use("login", localStrategy);
passport.use("jwt", jwtStrategy);

passport.serializeUser((user, done) => {
  // Strategy 성공 시 호출됨
  // console.log("serializeUser", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  console.log("deserializeUser", user);
  done(null, user); // 여기의 user가 req.user가 됨
});

export default passport;
