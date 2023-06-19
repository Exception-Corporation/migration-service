import { Request, Response } from "express";
import { IsNull } from "typeorm";
import { Form } from "../entitites/form.entity";
import { HistoryForm } from "../entitites/historyForm.entity";
import { GlobalFunctions } from "../utils/globalFunctions";

export class FormController {
  private constructor() {}

  static async saveForm(req: Request, res: Response) {
    try {
      const newForm = req.body;
      const form = new Form();

      if (
        !GlobalFunctions.getProperties(newForm, [
          "userId",
          "status",
          "name",
          "email",
          "phoneNumber",
          "reason",
          "startDate",
          "endDate",
          "type",
        ])
      ) {
        return res.status(400).send({ message: "Properties are not right" });
      }

      if (
        !newForm.status ||
        !newForm.name ||
        !newForm.email ||
        !newForm.phoneNumber ||
        !newForm.reason ||
        !newForm.startDate ||
        !newForm.endDate ||
        !newForm.type
      ) {
        return res.status(400).send({ message: "All information is required" });
      }

      if (newForm.userId) form.userId = newForm.userId;

      form.status = newForm.status;
      form.name = newForm.name;
      form.email = newForm.email;
      form.phoneNumber = newForm.phoneNumber;
      form.reason = newForm.reason;
      form.startDate = new Date(newForm.startDate);
      form.endDate = new Date(newForm.endDate);
      form.type = newForm.type;

      await form.save();

      return res.status(200).send({ message: "Form saved" });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const { page, pageSize, userId } = req.query;

      const where = {
        userId: userId ? Number(userId) : IsNull(),
      };

      const forms = await Form.find({
        where,
        order: {
          createdAt: "DESC",
        },
      });

      const result = forms.slice(
        Number(page) * Number(pageSize) - Number(pageSize),
        Number(page) * Number(pageSize)
      );

      const template = {
        success: true,
        page: Number(page),
        itemsByPage: Number(pageSize),
        formsSize: result.length,
        totalForms: forms.length,
        totalPages: Math.ceil(
          forms.length / Number(pageSize) < 1
            ? 1
            : forms.length / Number(pageSize)
        ),
        result: result,
      };

      return res.status(200).send(template);
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const form = await Form.findOneBy({ id: Number(id) });

      if (!form) return res.status(404).send({ message: "Form wasn't found" });

      return res.status(200).send({ form });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }

  static async deleteForm(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const result = await Form.delete(id);

      if (result.affected === 0)
        return res.status(404).send({ message: "Form wasn't found" });

      return res.status(200).send({ message: "Form deleted" });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }

  static async updateForm(req: Request, res: Response) {
    try {
      const author = req.headers.author;

      const formId = req.params.id;

      if (!author)
        return res.status(400).send({
          success: false,
          message: "Should send author throught headers",
        });

      const formFound = await Form.findOneBy({ id: Number(formId) });

      if (!formFound)
        return res.status(404).send({ message: "Form wasn't found" });

      const updatedForm = req.body;

      if (
        !updatedForm.userId &&
        !updatedForm.status &&
        !updatedForm.name &&
        !updatedForm.email &&
        !updatedForm.phoneNumber &&
        !updatedForm.reason &&
        !updatedForm.startDate &&
        !updatedForm.endDate &&
        !updatedForm.type
      ) {
        return res.status(400).send({ message: "Nothing has been updated" });
      }

      if (!GlobalFunctions.getProperties(updatedForm, Object.keys(formFound))) {
        return res.status(400).send({ message: "Properties are not right" });
      }

      await Form.update({ id: Number(formId) }, req.body);

      const historyForm = new HistoryForm();

      historyForm.formId = formFound!;
      historyForm.author = author.toString();
      historyForm.changes = JSON.stringify(updatedForm);

      await historyForm.save();

      return res.status(200).send({ message: "Form Updated" });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }
}
