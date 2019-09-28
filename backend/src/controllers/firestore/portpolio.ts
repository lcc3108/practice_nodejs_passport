import { portfolioCollection } from "@/controllers/firestore";
import { getSingleItem, getAllItem } from "@/controllers/firestore/firestore";
import { IPortfolio } from "@/models/firestore";

export const getAllPortfolio = async (): Promise<FirebaseFirestore.DocumentData[]> => {
  const data = await getAllItem("portfolio");
  return data;
};

export const getPortfolio = async (nickname: string): Promise<IPortfolio | undefined> => {
  const querySnapshot = await portfolioCollection.where("nickname", "==", nickname).get();
  return getSingleItem<IPortfolio>(querySnapshot);
};
