import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import { getUser, doLogin } from '@/controller/user';
import dotenv from 'dotenv';
var config = dotenv.config();
var LocalStrategy = passportLocal.Strategy;
var StrategyJwt = passportJWT.Strategy;
var extractJwt = passportJWT.ExtractJwt;
var param = {
  secretOrKey: process.env.secret,
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
};
console.log(process.env.secret);

var localStrategy = passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'uid',
      passwordField: 'passwd',
      // session: false,
    },
    async (uid, passwd, done) => {
      const user = await doLogin(uid, passwd);
      if (user) {
        console.log("find user")
        return done(null, user);
      }
      // error 데이터 없음
      else  {
        console.log("don't find user")
        return done(403, null);
      }
    },
  ),
);
passport.use(
  'jwt',
  new StrategyJwt(param, async (payload, done) => {
    const user = await getUser(payload.uid);
    if (user) return done(null, user);
    // error 데이터 없음
    else return done(403, null);
  }),
);

passport.serializeUser((user, done) => {
  // Strategy 성공 시 호출됨
  console.log("serializeUser")
  done(null,user)
});

passport.deserializeUser((user, done) => {
  // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  console.log("deserializeUser")
  done(null, user); // 여기의 user가 req.user가 됨
});

export default passport;
