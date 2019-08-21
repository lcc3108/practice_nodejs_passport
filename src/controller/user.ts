import { collection, getSingleItem } from '@/controller/firestore';
import { User } from '@/models/user';
import { cryptHelper } from './crypto';

export const getUser = async (uid: string): Promise<User | undefined> => {
  console.log("getUser"+uid);
  const querySnapshot = await collection.where('id', '==', uid).get();
  return getSingleItem<User>(querySnapshot);
};

export const doLogin = async (uid: string, passwd: string): Promise<User | undefined> => {
  console.log("doLogin"+uid+passwd);
  let data = await getUser(uid);
  if (data) {
    const { passwd: userPasswd, salt, ...user } = data;
    const { hash } = await cryptHelper(passwd, salt);
    return getSingleItem<User>(await collection.where('passwd', '==', hash).get());
  }
};
