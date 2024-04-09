import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
