import { isEmail } from "validator";

import { makeValidateTypeDirective } from "./builder";

export const EmailFormDirective = makeValidateTypeDirective(
  "EmailType",
  (value: string, { minLength, maxLength }) => {
    if (value.length < minLength) throw new Error("length less than minlength");
    if (value.length > maxLength) throw new Error("length more than maxlength");
    if (!isEmail(value)) throw new Error("no email format");
    return true;
  },
  { maxLength: 15, minLength: 10 },
);
