import { getUser } from "@/controllers/user";

export default {
  user: async (_, { id: userId }) => {
    const { id, email } = await getUser(userId);
    if (id && email) {
      return { id, email };
    }
  },
};
