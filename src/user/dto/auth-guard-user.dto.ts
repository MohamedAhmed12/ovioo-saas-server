import { IsEmail, IsString } from 'class-validator';

export class AuthGuardUserDto {
  @IsString()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  picture: string;

  @IsString()
  provider: string;
}
