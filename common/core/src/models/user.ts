import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
} from "class-validator";

export class User {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public password: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public displayName: string;
}
