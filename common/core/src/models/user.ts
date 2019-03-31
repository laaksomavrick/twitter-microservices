import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  Allow,
} from "class-validator";

export class User {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  @Allow()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  @Allow()
  readonly password: string;

  @IsEmail()
  @IsNotEmpty()
  @Allow()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Allow()
  readonly displayName: string;
}
