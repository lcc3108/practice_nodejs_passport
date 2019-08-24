import { doLogin } from "../user";
import passportLocal from "passport-local";

const LocalStrategy = passportLocal.Strategy;

export const localStrategy = new LocalStrategy(
  {
    usernameField: "id",
    passwordField: "passwd",
    session: false,
  },
  async (id, passwd, done) => {
    const user = await doLogin(id, passwd);
    if (user) {
      console.log("find user");
      return done(null, user);
    } else {
      // error 데이터 없음
      console.log("don't find user");
      return done(403, null);
    }
  },
);
