import { registerAs } from '@nestjs/config';

export const node = registerAs('node', () => ({
  env: process.env.ENVIRONMENT,
}));

export const firebase = registerAs('firebase', () => ({
  id: process.env.GCP_PROJECT_ID,
  email: process.env.FIREBASE_CLIENT_EMAIL,
  key: process.env.FIREBASE_PRIVATE_KEY,
}));

export const db = registerAs('db', () => ({
  username: process.env.DEV_DB_USERNAME,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE,
  devhost: process.env.DEV_DB_HOST,
  prodhost: process.env.PROD_DB_HOST,
  port: process.env.DEV_DB_PORT,
  schema: process.env.DEV_DB_SCHEMA,
  secretkey: process.env.DEV_DB_SECRET_KEY,
}));

export const jwt = registerAs('jwt', () => ({
  access_key: process.env.ACCESS_KEY,
  refresh_key: process.env.REFRESH_KEY,
  sign_algorithm: process.env.SIGN_ALGORITHM,
  verify_algorithm: process.env.VERIFY_ALGORITHM.split(/,/g).map((origin) =>
    origin.trim(),
  ),
  issuer: process.env.ISSUER,
  audience: process.env.AUDIENCE,
}));

export const bull = registerAs('bull', () => ({
  devhost: process.env.DEV_QUEUE_HOST,
  prodhost: process.env.PROD_QUEUE_HOST,
  port: process.env.QUEUE_PORT,
}));

export const crypto = registerAs('crypto', () => ({
  dev_decrypt: process.env.DEV_DECRYPT_QUERY,
  dev_encrypt: process.env.DEV_ENCRYPT_QUERY,
}));

export const email = registerAs('email', () => ({
  email: process.env.EMAIL_ID,
  secret: process.env.EMAIL_PASSWORD,
}));

export const host = registerAs('host', () => ({
  devback: process.env.DEV_BACKEND_HOST,
  devfront: process.env.DEV_FRONTEND_HOST,
  prod: process.env.PROD_HOST,
}));

export const sheet = registerAs('sheet', () => ({
  sooga: process.env.SHEET_SOOGA,
  purchase: process.env.SHEET_PURCHASE,
  id: process.env.GCP_PROJECT_ID,
  email: process.env.GCP_CLIENT_EMAIL,
  key: process.env.GCP_PRIVATE_KEY,
}));
