import path from 'path';
import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore({
  keyFilename: path.resolve(__dirname, '../../google_key.json'),
});

export const document = firestore.doc('users/dtd');
export default firestore

// (async () => {
//   // const express = require('express');
//   // const app = express();
//   // const port = 3000;
//   // console.log(serviceAccount);
//   const firestore = 
//   // async function quickstart() {
//   // Obtain a document reference.
//   const document = firestore.doc('user/test');
//   console.log(document);

//   // Enter new data into the document.
//   await document.set({
//     title: 'Welcome to Firestore',
//     body: 'Hello World',
//   });
//   console.log('Entered new data into the document');

//   // // Update an existing document.
//   // await document.update({
//   //   body: 'My first Firestore app',
//   // });
//   // console.log('Updated an existing document');

//   // // Read the document.
//   // let doc = await document.get();
//   // console.log('Read the document');

//   // // Delete the document.
//   // await document.delete();
//   // console.log('Deleted the document');
//   // }
//   // quickstart();

//   // console.log('Entered new data into the document');

//   // app.use();
//   // app.listen(3000, () => console.log(`Server listening on port ${port}`));
// })();