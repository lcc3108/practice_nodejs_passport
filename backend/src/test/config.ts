import "@/config";

import chai from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";

chai.use(chaiHttp);
chai.should();
dotenv.config();

export const expect = chai.expect;

export const gql = (query: TemplateStringsArray) => query.join("");
