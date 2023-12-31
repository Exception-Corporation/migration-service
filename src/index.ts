import http from "http";
import app from "./app";
import config from "./config";
import { AppDataSource } from "./db";
import { WebSocket } from "./websocket/socket.io";
import { CronJob } from "./cron-jobs/node-cron";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected");

    const server = http.createServer(app);

    new WebSocket(server).initialize();

    new CronJob().initialize();

    server.listen(config.server.port);

    console.log("Server is listening on port", config.server.port);
  } catch (error: any) {
    console.log(error);
  }
}

main();
