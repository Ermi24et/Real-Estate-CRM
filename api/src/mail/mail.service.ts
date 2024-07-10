import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(email: string, firstName: string) {
    const url = process.env.EMAIL_CONFIRMATION_URL;
    try {
      return await this.mailService.sendMail({
        to: email,
        subject: 'Welcome to customer service',
        template: './confiramation.hbs',
        context: { firstName: firstName, url: url },
      });
    } catch (error) {
      console.log('failed to send email', error);
      throw error;
    }
  }
}
