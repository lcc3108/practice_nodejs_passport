import { document } from './index';

export const insertDocument = async (title: string, body: string) => {
  await document.set({ title, body });
};
