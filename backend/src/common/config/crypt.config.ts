import * as dotenv from 'dotenv';

dotenv.config();

export const encryptQuery = (value) => {
  const encrypt = process.env.DEV_ENCRYPT_QUERY;
  return encrypt.replace('$value', value);
};

export const decryptQuery = (value) => {
  const encrypt = process.env.DEV_DECRYPT_QUERY;
  return encrypt.replace('$column', value);
};
