import { expect } from "chai";

import app, { requestAsync } from "@/tests/http";
import { deleteUser } from "@/controllers/user";

describe("singup", () => {
  before(async() => {
    await deleteUser("test@test.com");
  })

  it("doSignup", async () => {
    const result = await requestAsync("POST", "/", { body: { query: 'mutation{ signup(id: "test@test.com",passwd: "dtd",nickName: "tester"){status message} }' } });
    expect(result).to.have.status(200);
  });
});

// https://www.chaijs.com/plugins/chai-http/
