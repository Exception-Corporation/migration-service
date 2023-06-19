import dotenv from "dotenv";

dotenv.config({});

declare const process: any;

export default {
  server: {
    port: process.env.PORT,
  },
  JWT: {
    secretKey: process.env.JWT_SECRET_KEY,
  },
  database: {
    postgresql: {
      user: process.env.PSQL_USERNAME,
      password: process.env.PSQL_PASSWORD,
      host: process.env.PSQL_HOST,
      port: process.env.PSQL_PORT,
      database: process.env.PSQL_DATABASE,
    },
  },
};
