import '@/config';
import express from 'express';
import passport from '@/controller/auth';
import { loginModule } from '@/controller/app';
import logger from 'morgan';

const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
loginModule(app);
export const login = (req, res) => {
  try {
    (async () => {
      // await insertDocument('title', 'body')
      return res.send('travis test!');
    })();
  } catch (err) {
    return res.status(500).json(err);
  }
};
