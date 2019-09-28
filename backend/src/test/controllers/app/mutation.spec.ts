import { expect } from "chai";

import { requestGraphQLAsync, requestAsync } from "@/test/http";

import { deleteUser } from "@/controllers/firestore/user";

describe("mutation test", () => {
  describe("login test", () => {
    it("valid", async () => {
      const result = await requestGraphQLAsync({ query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd"){status message} }' });
      expect(result.text).to.have.string("data");
    });

    it("invalid", async () => {
      const result = await requestGraphQLAsync({ query: 'mutation{ login(userId: "admin@test.com",passwd: "zzz"){status message} }' });
      expect(result.text).to.have.string("id or passwd invalid");
    });

    it("cache test", async () => {
      //처음 로그인
      const {
        body: {
          data: {
            login: { message: auth },
          },
        },
      } = await requestGraphQLAsync({ query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd"){status message} }' });
      const before = await requestGraphQLAsync({
        query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd"){status message} }',
        authorization: auth,
      });
      expect(before.text).to.have.string("alreay exist token");

      await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
      await requestGraphQLAsync({ query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd"){status message} }' });

      const result = await requestGraphQLAsync({
        query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd"){status message} }',
        authorization: auth,
      });
      expect(result.text).to.not.have.string("errors");
      expect(result.text).to.not.have.string("alreay exist token");
    });
  });

  describe("singup test", () => {
    before(async () => {
      await deleteUser("test@test.com");
    });

    it("valid", async () => {
      const result = await requestAsync("POST", "/", {
        body: { query: 'mutation{ signup(userId: "test@test.com",passwd: "dtd",nickname: "tester"){status message} }' },
      });
      expect(result).to.have.status(200);
      expect(result.text).to.not.have.string("errors");
    });

    it("invalid", async () => {
      const result = await requestAsync("POST", "/", {
        body: { query: 'mutation{ signup(userId: "test",passwd: "dtd",nickname: "tester"){status message} }' },
      });
      expect(result.text).to.have.string("errors");
    });
  });
});

// https://www.chaijs.com/api/bdd/
//
