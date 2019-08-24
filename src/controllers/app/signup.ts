import { doSingUp } from "../user";

export const expressSignup = async (req, res, next) => {
  console.log(req.body);
  const { id, passwd, email } = req.body;
  const user = await doSingUp(id, passwd, email);
  if (user) {
    res.status(201).send("signup success");
  } else {
    res.status(403).send("signup fail");
  }
};
