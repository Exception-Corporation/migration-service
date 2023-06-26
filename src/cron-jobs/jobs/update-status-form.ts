import { Form } from "../../entitites/form.entity";

export class UpdateStatusForm {
  constructor() {}

  public async execute() {
    try {
      const currentDate = new Date();

      // Obtener los formularios que cumplen los criterios
      const formsToUpdate = await Form.createQueryBuilder("form")
        .where("form.status = :status", { status: "pending" })
        .andWhere("form.confirm < :minConfirmationDate", {
          minConfirmationDate: new Date(
            currentDate.getTime() - 12 * 60 * 60 * 1000
          ).toISOString(),
        })
        .getMany();

      for (const form of formsToUpdate) {
        form.status = "finish";
        await form.save();
      }

      console.log(`Se actualizaron ${formsToUpdate.length} formularios.`);
    } catch (error) {
      console.error("Error en el cron-job update-status-form:", error);
    }
  }
}
