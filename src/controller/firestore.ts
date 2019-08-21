import path from 'path';
import { Firestore, QuerySnapshot } from '@google-cloud/firestore';

const firestore = new Firestore({
  keyFilename: path.resolve(__dirname, '../../google_key.json'),
});

export const getSingleItem = async <T>(querySnapshot: QuerySnapshot):Promise<T | undefined> => {
  const data = querySnapshot.docs[0];
  if (data) {
    return data.data() as T;
  } 
}

export const collection = firestore.collection('users');
export const document = firestore.doc('users/dtd');

export default firestore;
