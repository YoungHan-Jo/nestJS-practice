import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}

  createUser = async (name: string, email: string, password: string) => {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    // await this.sendMemberJoinEmail(email, signupVerifyToken);
  };

  private checkUserExists = (email: string) => {
    return false; // TODO
  };

  private saveUser = (
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) => {
    return; // TODO
  };

  private sendMemberJoinEmail = async (
    email: string,
    signupVerifyToken: string,
  ) => {
    return this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  };

  verifyEmail = async (signupVerifyToken: string) => {
    // TODO
    // 1. find user by signupVerifyToken, unless throw error
    // 2. return jwt token
    throw new Error('Not implemented yet');
  };

  login = async (email: string, password: string) => {
    // TODO
    // 1. find user by email, unless throw error
    // 2. return jwt token
    throw new Error('Not implemented yet');
  };

  getUserInfo = async (userId: string) => {
    // TODO
    // 1. find user by userId, unless throw error
    // 2. return user info
    throw new Error('Not implemented yet');
  };
}
