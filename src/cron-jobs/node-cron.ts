import cron, { ScheduledTask } from "node-cron";
import { UpdateStatusForm } from "./jobs/update-status-form";

export class CronJob {
  private crons: ScheduledTask[];
  private jobs: Function[] = [UpdateStatusForm];

  constructor() {
    this.crons = this.jobs.map((Job: any) =>
      cron.schedule("0 */12 * * *", new Job().execute)
    );
  }

  public initialize() {
    this.crons.forEach((cron) => cron.start());
  }
}
