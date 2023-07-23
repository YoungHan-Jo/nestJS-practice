import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'younghan.jo@hapins.net',
        pass: 'ilvwvtnlhxnsmgld',
      },
    });
  }

  sendMemberJoinVerification = async (
    email: string,
    signupVerifyToken: string,
  ) => {
    const baseUrl = 'http://localhost:3000';

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: email,
      subject: 'sign up verification mail',
      html: `if you click this submit button, you can verify your email address.<br/> 
        <form action="${url}" method="post">
            <input type="submit" value="submit" />
        </form>`,
    };

    return await this.transporter.sendMail(mailOptions);
  };
}
