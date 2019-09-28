import { expect } from "chai";

import app, { requestAsync, requestGraphQLAsync } from "@/test/http";

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

  it("validateToken ", async () => {
    const result = await requestGraphQLAsync({
      query: `query{ validateToken(token: "${auth}") }`,
    });
    expect(result).to.have.status(200);
    expect(result.text).to.not.have.string("errors");
  });

  it("validateId  ", async () => {
    const result = await requestGraphQLAsync({
      query: `query{ validateId(userId: "admin@test.com") }`,
    });
    expect(result).to.have.status(200);
    expect(result.text).to.not.have.string("errors");
  });
});

// https://www.chaijs.com/plugins/chai-http/
