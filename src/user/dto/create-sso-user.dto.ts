import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSsoUserDto {
  @IsString()
  @Field(() => String, { nullable: true })
  fullname?: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @IsString()
  @Field(() => String, { nullable: true })
  avatar?: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  provider: string;
}
