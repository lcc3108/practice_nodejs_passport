import { getUser } from "@/controllers/firestore/user";
import { isValidToken } from "@/controllers/app/jwt";
import { getAllPortfolio, getPortfolio } from "../firestore/portpolio";

export default {
  validateToken: (_, __, { user }) => {
    return isValidToken(user);
  },
  validateId: async (_, { userId }, ___) => {
    const id = await getUser(userId);
    if (id) return false;
    return true;
  },
  retrieveUser: async (_, { userId }) => {
    const user = await getUser(userId);
    if (user) return { status: 200, message: "find user", user };
    else return { status: 403, message: "errors can't find user", user };
  },
  retrievePortfolio: async (_, { userId }) => {
    const data = await getPortfolio(userId);
    if (data) return { status: 200, message: "find portfolio", portfolio: data };
    else return { status: 403, message: "errors can't find portfolio", portfolio: data };
  },
  retrieveAllPortfolio: async () => {
    return await getAllPortfolio();
  },
};
