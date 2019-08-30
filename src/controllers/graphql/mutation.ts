import { doLogin, deleteUser, getUser, doSingUp } from "@/controllers/user";
import { isValidToken, generateToken } from "../app/jwt";
import { client } from "../redis";

export default {
  login: async (_, { id, passwd }, { user: userInfo }) => {
    if (userInfo && (await isValidToken(userInfo))) throw "alreay exist token";
    const user = await doLogin(id, passwd);
    if (user) {
      const { id: userId, nickName } = user;
      return generateToken(id);
    } else return "id or passwd invalid";
  },
  signup: async (_, { id, passwd, nickName }) => {
    const user = await doSingUp(id, passwd, nickName);
    if (user) return { status: 200, message: "success signup" };
    else return { status: 403, message: "invalid or already exist id" };
  },
  signout: async (_, __, { user }) => {
    deleteUser(user.id);
    return true;
  },
};
