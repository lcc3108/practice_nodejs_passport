import path from "path";
import { Firestore, QuerySnapshot, DocumentReference, DocumentSnapshot, FieldValue } from "@google-cloud/firestore";

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
  return userCollection.add(data);
};

export const getAllItem = async (collectionName: string): Promise<FirebaseFirestore.DocumentData[]> => {
  const data = await firestore
    .collection(collectionName)
    .orderBy("time", "desc")
    .get();
  const items = new Array<FirebaseFirestore.DocumentData>();
  data.forEach((documentSnapshot) => {
    items.push(documentSnapshot.data());
  });
  return items;
};

const isTest = process.env.NODE_ENV !== "production";
const userCollectionSelect = isTest ? ["userTest", "portfolioTest"] : ["users", "portfolio"];

export const userCollection = firestore.collection(userCollectionSelect[0]);
export const portfolioCollection = firestore.collection(userCollectionSelect[1]);

export default firestore;
