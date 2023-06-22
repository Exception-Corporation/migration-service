import app from "./app";
import config from "./config";
import { AppDataSource } from "./db";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected");

    app.listen(config.server.port);
    console.log("Server is listening on port", config.server.port);
  } catch (error: any) {
    console.log(error);
  }
}

main();
