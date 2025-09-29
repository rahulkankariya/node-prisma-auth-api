// bcrypt.ts
import bcrypt from 'bcrypt';
const { BCRYPT_SALT } = process.env;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, parseInt(BCRYPT_SALT as string));
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
