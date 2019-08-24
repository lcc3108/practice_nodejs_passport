import path from "path";
import { Firestore, QuerySnapshot, DocumentReference } from "@google-cloud/firestore";

const firestore = new Firestore({
  keyFilename: path.resolve(__dirname, process.env.NODE_ENV === "production" ? "../google_key.json" : "../../google_key.json"),
});

export const getSingleItem = async <T>(querySnapshot: QuerySnapshot): Promise<T | undefined> => {
  const data = querySnapshot.docs[0];
  if (data) {
    return data.data() as T;
  }
};

export const addSingleItem = async (data): Promise<DocumentReference | undefined> => {
  return collection.add(data);
};

const isTest = process.env.NODE_ENV !== "production";
const userCollection = isTest ? "userTest" : "users";

export const collection = firestore.collection(userCollection);
export const document = firestore.doc(userCollection + "/dtd");

export default firestore;
