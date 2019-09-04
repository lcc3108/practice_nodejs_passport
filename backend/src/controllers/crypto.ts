import crypto from "crypto";
const repeat = 10000;

interface ICryptoItem {
  hash: string;
  salt: string;
}

const encryptPassword = async (passwd: string, salt: string): Promise<ICryptoItem> => {
  return new Promise<ICryptoItem>((resolve, reject) => {
    crypto.pbkdf2(passwd, salt, repeat, 64, "sha512", (err, key) => {
      return resolve({ hash: key.toString("base64"), salt });
    });
  });
};

export const cryptHelper = async (passwd: string, salt?: string): Promise<ICryptoItem> => {
  return encryptPassword(passwd, salt || crypto.randomBytes(64).toString("base64"));
};
