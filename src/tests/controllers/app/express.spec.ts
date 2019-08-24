import { expect } from "chai";

import app, { requestAsync } from "@/tests/http";

import "./signup.spec";

describe("passport login", () => {
  it("dologin", async () => {
    const result = await requestAsync("GET", "/login", { params: { id: "admin", passwd: "dtd" } });
    expect(result).to.have.status(200);
  })
});

// https://www.chaijs.com/api/bdd/
