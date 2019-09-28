import { expect } from "chai";

import { requestGraphQLAsync } from "@/test/http";

let auth: string;

describe("query test", () => {
  before(async () => {
    const {
      body: {
        data: {
          login: { message: token },
        },
      },
    } = await requestGraphQLAsync({ query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd"){status message} }' });
    auth = token;
  });

  describe("validateToken test", () => {
    it("valid", async () => {
      const result = await requestGraphQLAsync({
        query: `query{ validateToken }`,
        authorization: auth,
      });
      console.log("result.body", result.body);
      expect(result).to.have.status(200);
      expect(result.text).to.not.have.string("errors");
      expect(result.body.data.validateToken).to.be.true;
    });

    it("invalid", async () => {
      const result = await requestGraphQLAsync({
        query: `query{ validateToken }`,
        authorization: auth + "aa",
      });

      expect(result).to.have.status(401);
      expect(result.text).to.have.string("UnauthorizedError");
    });
  });

  describe("validateId test", () => {
    it("valid", async () => {
      const result = await requestGraphQLAsync({
        query: `query{ validateId(userId: "admin@test.com") }`,
      });
      expect(result).to.have.status(200);
      expect(result.text).to.not.have.string("errors");
      expect(result.body.data.validateId).to.be.false;
    });

    it("invalid", async () => {
      const result = await requestGraphQLAsync({
        query: `query{ validateId(userId: "dtd@test.com") }`,
      });
      expect(result).to.have.status(200);
      expect(result.text).to.not.have.string("errors");
      expect(result.body.data.validateId).to.be.true;
    });
  });

  describe("retrievePortfolio test", () => {
    it("valid", async () => {
      const result = await requestGraphQLAsync({
        query: `query{ retrievePortfolio(userId: "admin@test.com"){status message portfolio { title } } }`,
      });
      expect(result).to.have.status(200);
      expect(result.text).to.not.have.string("errors");
      expect(result.body.data.retrievePortfolio).to.have.status(200);
    });

    it("invalid", async () => {
      const result = await requestGraphQLAsync({
        query: `query{ retrievePortfolio(userId: "dtd@test.com"){status message portfolio { title } } }`,
      });
      expect(result).to.have.status(200);
      expect(result.text).to.have.string("errors");
      expect(result.body.data.retrievePortfolio).to.have.status(403);
    });
  });

  describe("retrieveAllPortfolio test", () => {
    it("valid", async () => {
      const result = await requestGraphQLAsync({
        query: `query{ retrieveAllPortfolio { title body file } }`,
      });
      expect(result).to.have.status(200);
      expect(result.text).to.not.have.string("errors");
    });
  });
});

// https://www.chaijs.com/plugins/chai-http/
