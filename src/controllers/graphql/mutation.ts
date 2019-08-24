import { doLogin, deleteUser } from "@/controllers/user";
import { generateToken } from "@/controllers/passport/jwt";

export default {
  login: async (_, { id, passwd }) => {
    const user = await doLogin(id, passwd);
    if (user) {
      const { id: userId, email } = user;
      return generateToken(id);
    }
  },
  signout: async (_, __, { user }) => {
    console.log(user);
    deleteUser(user.id);
    return true;
  },
};
