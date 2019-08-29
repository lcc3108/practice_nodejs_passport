import express  from 'express';
import jwt from 'express-jwt';
import logger from "morgan";
import server from "@/controllers/graphql";
// init express
export const app = express();
// jwt setting
const authMiddleware = jwt({
    secret: process.env.jwtsecret,
    credentialsRequired: false,
});

// middleware add
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(authMiddleware);

// grapql load
server.applyMiddleware({ app, path: "/" });

console.log('load', __filename)
