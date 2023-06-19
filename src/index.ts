import app from "./app";
import { AppDataSource } from "./db";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected");

    app.listen(5000);
    console.log("Server is listening on port", 5000);
  } catch (error: any) {
    console.log(error);
  }
}

main();
