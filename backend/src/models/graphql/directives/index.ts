import { IsAuthDirective } from "./auth";
import { EmailFormDirective } from "./email";

export const schemaDirectives = {
  isAuth: IsAuthDirective,
  isEmail: EmailFormDirective,
};
