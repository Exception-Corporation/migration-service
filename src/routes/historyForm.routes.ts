import { Router } from "express";
import { HistoryFormController } from "../controllers/historyForm.controller";

export class HistoryFormRouter {
  private router: Router;
  constructor() {
    this.router = Router();

    this.router.get("/getAll", HistoryFormController.getAll);

    this.router.get("/getOne/:formatId", HistoryFormController.getOne);
  }

  public getRouter() {
    return this.router;
  }
}
