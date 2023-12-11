import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('email.email'),
        pass: this.configService.get('email.secret'),
      },
    });
  }

  async sendMail(
    emailAddress: string,
    subject: string,
    html: string,
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get('email.email'),
      to: emailAddress,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
