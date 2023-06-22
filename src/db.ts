import { DataSource } from "typeorm";
import { Form } from "./entitites/form.entity";
import { Comment } from "./entitites/comment.entity";
import config from "./config";
import { HistoryForm } from "./entitites/historyForm.entity";

const postgres = config.database.postgresql;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: postgres.host,
  port: postgres.port,
  username: postgres.user,
  password: postgres.password,
  database: postgres.database,
  synchronize: true,
  entities: [Form, Comment, HistoryForm],
  logging: false,
});
