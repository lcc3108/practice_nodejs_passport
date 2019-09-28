import { IUser } from "@/models/user";
import { cryptHelper } from "@/controllers/crypto";
import { DocumentReference } from "@google-cloud/firestore";
import { userCollection } from "@/controllers/firestore";
import { getSingleItem, addSingleItem } from "@/controllers/firestore/firestore";

export const deleteUser = async (id: string) => {
  const querySnapshot = await userCollection.where("id", "==", id).get();
  if (querySnapshot.docs[0]) querySnapshot.docs[0].ref.delete();
};

export const getUser = async (id: string): Promise<IUser | undefined> => {
  const querySnapshot = await userCollection.where("id", "==", id).get();
  return getSingleItem<IUser>(querySnapshot);
};

export const doLogin = async (id: string, passwd: string): Promise<IUser | undefined> => {
  const data = await getUser(id);
  if (data) {
    const { passwd: userPasswd, salt, ...user } = data;
    const { hash } = await cryptHelper(passwd, salt);
    return getSingleItem<IUser>(await userCollection.where("passwd", "==", hash).get());
  }
};

export const doSingUp = async (id: string, passwd: string, nickname: string): Promise<DocumentReference | undefined> => {
  const data = await getUser(id);
  if (!data) {
    const { hash, salt } = await cryptHelper(passwd);
    return addSingleItem({ id, passwd: hash, salt, nickname });
  }
};
