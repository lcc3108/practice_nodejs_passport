import { expect } from "chai";

import app, { requestAsync } from "@/tests/http";

describe("passport singup", () => {
  it("doSignup", async () => {
    // const result = await requestAsync("POST", "/signup", { body: { id: "admin", passwd: "dtd", email: "dlacocjf32@gmail.com" } });
    // expect(result).to.have.status(200);
  })

  after(async() => {
    // sign-out user
  })
});

// https://www.chaijs.com/plugins/chai-http/
