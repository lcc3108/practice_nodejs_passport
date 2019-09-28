import firestore, { userCollection } from "@/controllers/firestore";
import { QuerySnapshot, DocumentReference } from "@google-cloud/firestore";

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
