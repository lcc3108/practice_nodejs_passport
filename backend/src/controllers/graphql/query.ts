import { getUser } from "@/controllers/user";
import { isValidToken } from "../app/jwt";
import { getAllItem } from "@/controllers/firestore";

export default {
  validateToken: (_, __, { user }) => {
    return isValidToken(user);
  },
  validateId: async (_, { userId }, ___) => {
    const id = await getUser(userId);
    console.log('id', id)
    if(id) return false;
    return true;
  },
  retrieveUser: async (_, { userId }, { user }) => {
    const { id, nickname } = await getUser(userId);
    if (id && nickname) return { id, nickname };
  },
  retrievePortfolio: async (_, { userId }) => {
    const { id, nickname } = await getUser(userId);
    if (id && nickname) {
      return { satus: 200, message: "find" };
    }
  },
  retrieveAllPortfolio: async () => {
    const data = getAllItem("portfolio");
    return data;
  },
};
