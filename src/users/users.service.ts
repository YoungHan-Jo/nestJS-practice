import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { UserEntity } from './user.entity';
import { UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createUser = async (name: string, email: string, password: string) => {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException('User already exists');
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    // await this.sendMemberJoinEmail(email, signupVerifyToken);
  };

  private checkUserExists = async (email: string) => {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user !== undefined; // TODO
  };

  private saveUser = async (
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) => {
    const user = new UserEntity();
    user.id = uuid.v1();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.userRepository.save(user);
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
