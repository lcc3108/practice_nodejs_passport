import { expect, assert } from "chai";

import app, { requestGraphQLAsync } from "@/tests/http";

import "./signup.spec";

describe("login", () => {
  it("dologin valid", async () => {
    const result = await requestGraphQLAsync({ query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd") }' });
    expect(result.text).to.have.string("data");
  });

  it("dologin invalid", async () => {
    const result = await requestGraphQLAsync({ query: 'mutation{ login(userId: "admin@test.com",passwd: "zzz") }' });
    expect(result.text).to.have.string("id or passwd invalid");
  });

  it("cache test", async () => {
    //처음 로그인
    const { body: login } = await requestGraphQLAsync({ query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd") }' });
    const before = await requestGraphQLAsync({
      query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd") }',
      authorization: login.data.login,
    });
    expect(before.text).to.have.string("alreay exist token");

    await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
    await requestGraphQLAsync({ query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd") }' });

    const result = await requestGraphQLAsync({
      query: 'mutation{ login(userId: "admin@test.com",passwd: "dtd") }',
      authorization: login.data.login,
    });
    console.log(result.body);
    expect(result.text).to.not.have.string("errors");
    expect(result.text).to.not.have.string("alreay exist token");
  });
});

// https://www.chaijs.com/api/bdd/
//
