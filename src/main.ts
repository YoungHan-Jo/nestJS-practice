import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig } from './env';
import { Firestore } from './infrastructure/firestore/client/firestore';
import { BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const config = new ConfigService();
  EnvConfig.initialize(config);
  Firestore.initialize();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const person = new Person('John');
  for (let key in person) {
    console.log(`${key}: ${person[key]}`);
  }
  person.setName('Cho');
}
bootstrap();

function Enumerable(enumerable: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    descriptor.enumerable = enumerable;
  };
}

const MinLength = (min: number) => {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    console.log('========== minLength ==========');
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('parameterIndex', parameterIndex);
    target.validators = {
      minLength: (args: string[]) => {
        return args[parameterIndex].length >= min;
      },
    };
  };
};

const Validate = (
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor,
) => {
  console.log('========== validate ==========');
  console.log('target', target);
  const method = descriptor.value;

  descriptor.value = (...args: any[]) => {
    Object.keys(target.validators).forEach(key => {
      if (!target.validators[key](args)) throw new BadRequestException();
    });
    method.apply(this, args);
  };
};

class Person {
  constructor(private name: string) {}

  @Enumerable(false)
  get getName() {
    return this.name;
  }

  @Validate
  setName(@MinLength(3) name: string) {
    this.name = name;
  }
}
