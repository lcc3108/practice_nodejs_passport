import { getUser } from "@/controllers/user";

export default {
  retrieveUser: async (_, { id: userId }, { user }) => {
    const { id, nickname } = await getUser(userId);
    if (id && nickname) return { id, nickname };
  },
  retrievePortfolio: async (_, { id: userId }) => {
    const { id, nickname } = await getUser(userId);
    if (id && nickname) {
      return { satus: 200, message: "find" };
    }
  },
};
