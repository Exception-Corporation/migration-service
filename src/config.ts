import dotenv from "dotenv";

dotenv.config({});

declare const process: any;

export default {
  server: {
    port: process.env.PORT,
  },
  mailer: {
    nodemailer: {
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      email: process.env.MAILER_EMAIL,
      password: process.env.MAILER_PASSWORD,
      front: process.env.MAILER_FRONT,
    },
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
