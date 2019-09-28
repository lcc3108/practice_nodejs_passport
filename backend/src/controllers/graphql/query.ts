import { getUser } from "@/controllers/firestore/user";
import { isValidToken } from "@/controllers/app/jwt";
import { getAllItem } from "@/controllers/firestore/firestore";

export default {
  validateToken: (_, { token }) => {
    return isValidToken(token);
  },
  validateId: async (_, { userId }, ___) => {
    const id = await getUser(userId);
    if (id) return false;
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
