import { getUser } from "@/controllers/user";

export default {
  retrieveUser: async (_, { id: userId }, { user }) => {
    const { id, nickName } = await getUser(userId);
    if (id && nickName) return { id, nickName };
  },
  retrievePortfolio: async (_, { id: userId }) => {
    const { id, nickName } = await getUser(userId);
    if (id && nickName) {
      return { satus: 200, message: "find" };
    }
  },
};