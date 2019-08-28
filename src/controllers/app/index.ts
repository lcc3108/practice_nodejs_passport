import express from "express";
import logger from "morgan";
import passport from "@/controllers/passport";
import server from "@/controllers/graphql";
// import { expressSignup } from "./signup";
// init express
export const app = express();
// middleware add
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.set("jwt-secret", process.env.jwtsecret);
app.use(passport.initialize());
app.use(passport.authenticate("jwt"));

// grapql load
server.applyMiddleware({ app, path: "/" });

console.log('load', __filename)
