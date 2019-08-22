
import passport from './auth';
import jwt from 'jsonwebtoken';
export const loginModule = app => {
  app.get('/login', (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info) {
        res.send(info);
      } else {
        req.logIn(user, async err => {
          if (user) {
            console.log(user.uid);
            const jwtToken = jwt.sign({ uid: user.id }, process.env.jwtsecret,{
              expiresIn: '5m',
              issuer: 'lcc3108.com',
              subject: 'userInfo'
          });
            res.status(200).send({
              auth: true,
              token: jwtToken,
              message: 'login success',
            });
          }
        });
      }
    })(req, res, next);
  });
  app.get('/session', passport.authenticate('jwt'), (req, res) => {
    res.status(200).send({
      auth:true
    });
  });
  app.set('jwt-secret', process.env.jwtsecret);
  app.listen(3000, () => {
    console.log('start server');
  });
};
