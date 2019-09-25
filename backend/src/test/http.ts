import "@/test/config";

import chai from "chai";
import express from "express";
import logger from "morgan";

import { app } from "@/controllers/app";

export default app;

interface IChaiRequest {
  params?: any;
  body?: any;
  authorization?: string;
  gql?: any;
}

type Response = any;
type methods = "GET" | "POST" | "PUT" | "DELETE";

/**
 * @param method HTTP Methods (GET, POST, DELETE, PUT)
 * @param path
 */
export const requestAsync = async (method: methods, path: string, { authorization, body, params, gql }: IChaiRequest) => {
  return new Promise<Response>((resolve, reject) => {
    return chai
      .request(app)
      [method.toLowerCase()](path)
      .query(params || {})
      .set("authorization", authorization ? `Bearer ${authorization}` : "")
      .send(body || {})
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
};

interface IGraphQLRequest extends IChaiRequest {
  query: string;
}

export const requestGraphQLAsync = async ({ authorization, params, query }: IGraphQLRequest) => {
  return requestAsync("POST", "/", { authorization, body: { query }, params });
};
