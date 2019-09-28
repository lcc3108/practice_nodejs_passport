import path from "path";
import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore({
  keyFilename: path.resolve(__dirname, process.env.NODE_ENV === "production" ? "../../google_key.json" : "../../../google_key.json"),
});

const isTest = process.env.NODE_ENV !== "production";
const userCollectionSelect = isTest ? ["userTest", "portfolioTest"] : ["users", "portfolio"];

export const userCollection = firestore.collection(userCollectionSelect[0]);
export const portfolioCollection = firestore.collection(userCollectionSelect[1]);

export default firestore;
