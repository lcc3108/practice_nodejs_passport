import { doLogin, deleteUser, getUser, doSingUp } from "@/controllers/firestore/user";
import { isValidToken, generateToken } from "../app/jwt";

export default {
  login: async (_, { userId, passwd }, { user: userInfo }) => {
    if (userInfo && (await isValidToken(userInfo))) throw "alreay exist token";
    const user = await doLogin(userId, passwd);
    if (user) {
      const { id, nickname } = user;
      return { status: 200, message: generateToken(id) };
    } else return { status: 403, message: "id or passwd invalid" };
  },
  signup: async (_, { userId, passwd, nickname }) => {
    const user = await doSingUp(userId, passwd, nickname);
    if (user) return { status: 200, message: "success signup" };
    else return { status: 403, message: "invalid or already exist id" };
  },
  signout: async (_, __, { user }) => {
    deleteUser(user.id);
    return true;
  },
};
