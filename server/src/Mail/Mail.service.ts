// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'; // Use the import syntax
import mailConfig from './nodemailer.config'; // Import the mail configuration

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig);
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: 'tk55971@gmail.com',
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  }
}
