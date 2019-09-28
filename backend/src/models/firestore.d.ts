export interface IUser {
  id: string;
  passwd: string;
  salt: string;
  nickname: string;
}

export interface IPortfolio {
  title: string;
  body: string;
  spec: string[];
  file: string[];
  nickname: string;
}
