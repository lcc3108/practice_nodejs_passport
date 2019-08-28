import { expect, assert } from "chai";

import app, { requestGraphQLAsync } from "@/tests/http";

import "./signup.spec";

describe("login", () => {
  it("dologin valid", async () => {
    const result = await requestGraphQLAsync({ query: 'mutation{ login(id: "admin@test.com",passwd: "dtd") }' });
    expect(result.text).to.have.string("data");
  });

  it.only("dologin invalid", async () => {
    const result = await requestGraphQLAsync({ query: 'mutation{ login(id: "admin@test.com",passwd: "zzz") }' });
    expect(result.body).to.have.string("id or passwd invalid");
  });

  it("cache test", async () => {
    const { body: login } = await requestGraphQLAsync({ query: 'mutation{ login(id: "admin@test.com",passwd: "dtd") }' });
    const before = await requestGraphQLAsync({
      query: 'mutation{ login(id: "admin@test.com",passwd: "dtd") }',
      authorization: login.data.login,
    });

    expect(before.text).to.have.string("alreay exist token");

    await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
    await requestGraphQLAsync({ query: 'mutation{ login(id: "admin@test.com",passwd: "dtd") }' });

    const result = await requestGraphQLAsync({
      query: 'mutation{ login(id: "admin@test.com",passwd: "dtd") }',
      authorization: login.data.login,
    });

    expect(result.text).to.not.have.string("alreay exist token");
  });
});

// https://www.chaijs.com/api/bdd/
//
