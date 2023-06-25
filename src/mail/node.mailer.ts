import nodemailer, { SendMailOptions } from "nodemailer";
import config from "../config";

export type options = SendMailOptions;

export class NodeMailer {
  async send(params: SendMailOptions): Promise<void> {
    try {
      const carrier = nodemailer.createTransport({
        host: config.mailer.nodemailer.host,
        port: config.mailer.nodemailer.port,
        secure: false,
        auth: {
          user: config.mailer.nodemailer.email,
          pass: config.mailer.nodemailer.password,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await carrier.sendMail({
        from: '"CRM Admin" <crm@itsystem.com.mx>',
        to: params.to,
        subject: params.subject,
        html: params.html,
      });
    } catch (error: any) {
      throw console.info(error.toString());
    }
  }
}
