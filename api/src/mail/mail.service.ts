import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(email: string, firstName: string) {
    try {
      return await this.mailService.sendMail({
        to: email,
        subject: 'Welcome to customer service',
        text: 'welcome',
        context: { firstName },
        html: '<b>This is to inform you that you are in to our community.</b>',
      });
    } catch (error) {
      console.log('failed to send email', error);
      throw error;
    }
  }
}
