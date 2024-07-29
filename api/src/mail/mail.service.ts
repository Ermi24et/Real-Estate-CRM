import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendOtpMessage({ email, message }: { email: string; message: string }) {
    this.logger.log(`Sending email to ${email}`);
    this.logger.log(`${message}`);

    await this.mailerService.sendMail({
      to: email,
      from: `customorservices@gmail.com`,
      subject: 'Welcome to customer service verify your account.',
      html: `
            <div>
              <h1>Hello there,</h1>
              <p>Confirm your email</p>
              <p>${message}</p>
            </div>
            `,
    });
  }
}
