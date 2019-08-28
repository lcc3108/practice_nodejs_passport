import { collection, getSingleItem, addSingleItem } from "@/controllers/firestore";
import { IUser } from "@/models/user";
import { cryptHelper } from "./crypto";
import { DocumentReference } from "@google-cloud/firestore";

function emailIsValid(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export const deleteUser = async (id: string) => {
  const querySnapshot = await collection.where("id", "==", id).get();
  if (querySnapshot.docs[0]) querySnapshot.docs[0].ref.delete();
};

export const getUser = async (id: string): Promise<IUser | undefined> => {
  // console.log("getUser" + id);
  const querySnapshot = await collection.where("id", "==", id).get();
  return getSingleItem<IUser>(querySnapshot);
};

export const doLogin = async (id: string, passwd: string): Promise<IUser | undefined> => {
  // console.log("doLogin" + id + passwd);
  const data = await getUser(id);
  if (data) {
    const { passwd: userPasswd, salt, ...user } = data;
    const { hash } = await cryptHelper(passwd, salt);
    return getSingleItem<IUser>(await collection.where("passwd", "==", hash).get());
  }
};

export const doSingUp = async (id: string, passwd: string, nickName: string): Promise<DocumentReference | undefined> => {
  // console.log("doSignup");
  if (emailIsValid(id)) {
    const data = await getUser(id);
    if (!data) {
      const { hash, salt } = await cryptHelper(passwd);
      return addSingleItem({ id, hash, salt, nickName });
    }
  }
};
