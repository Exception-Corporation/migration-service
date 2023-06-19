import { Router } from "express";
import { FormController } from "../controllers/form.controller";

export class FormRouter {
  private router: Router;
  constructor() {
    this.router = Router();

    this.router.post("/save", FormController.saveForm);

    this.router.get("/getAll", FormController.getAll);

    this.router.get("/getOne/:id", FormController.getOne);

    this.router.delete("/delete/:id", FormController.deleteForm);

    this.router.put("/update/:id", FormController.updateForm);
  }

  public getRouter() {
    return this.router;
  }
}
