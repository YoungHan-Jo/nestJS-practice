import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';
import { NotIn } from 'src/utils/decorators/not-in';

export class CreateUserDto {
  // @Transform(({ value, obj }) => {
  //   console.log(value, obj.password);
  //   if (obj.password.includes(value.trim())) {
  //     throw new BadRequestException('password cannot contain name');
  //   }
  //   return value.trim();
  // })
  @Transform(params => params.value.trim())
  @NotIn('password', { message: 'password cannot contain name' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z/\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
