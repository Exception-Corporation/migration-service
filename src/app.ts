import express from "express";
import morgan from "morgan";
import cors from "cors";
import { FormRouter } from "./routes/form.routes";
import { CommentRouter } from "./routes/comment.routes";
import { HistoryFormRouter } from "./routes/historyForm.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use("/form", new FormRouter().getRouter());
app.use("/comment", new CommentRouter().getRouter());
app.use("/historyForm", new HistoryFormRouter().getRouter());

export default app;
