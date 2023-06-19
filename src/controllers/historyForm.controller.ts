import { Request, Response } from "express";
import { HistoryForm } from "../entitites/historyForm.entity";

export class HistoryFormController {
  private constructor() {}

  static async getAll(_req: Request, res: Response) {
    try {
      const historyForms = await HistoryForm.find({
        relations: ["formId"],
        order: {
          createdAt: "DESC",
        },
      });

      const hfModified = historyForms.map((row) => {
        row.changes = JSON.parse(row.changes);
        (row.formId as any) = row.formId.id;
        return row;
      });

      return res.status(200).send({ data: hfModified });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const formaId = req.params.formatId;

      const historyForms = await HistoryForm.find({
        where: {
          formId: Number(formaId) as any,
        },
        relations: ["formId"],
        order: {
          createdAt: "DESC",
        },
      });

      const historyForm = historyForms.map((row) => {
        row.changes = JSON.parse(row.changes);
        (row.formId as any) = row.formId.id;
        return row;
      });

      if (historyForm.length == 0)
        return res
          .status(404)
          .send({ message: "No historyForms with that formatId" });

      return res.status(200).send({ historyForm });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }
}
