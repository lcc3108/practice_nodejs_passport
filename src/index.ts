import '@babel/polyfill';

import { insertDocument } from '@/models/document';
// insertDocument('aaa','bbb');
export const login = (req, res) => {
  try {
    (async() => {
      // await insertDocument('title', 'body')
      return res.send('travis test!');
    })()
  } catch (err) {
    return res.status(500).json(err);
  }
};
