import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";

export class CommentRouter {
  private router: Router;
  constructor() {
    this.router = Router();

    this.router.post("/save", CommentController.saveComment);

    this.router.get("/getAll", CommentController.getAll);

    this.router.get("/getOne/:id", CommentController.getOne);

    this.router.delete("/delete/:id", CommentController.deleteComment);

    this.router.put("/update/:id", CommentController.updateComment);
  }

  public getRouter() {
    return this.router;
  }
}
